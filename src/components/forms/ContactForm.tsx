import { useId, useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldName = 'name' | 'phone' | 'email' | 'services' | 'otherDetail' | 'message';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  // Multi-select: a visitor can genuinely need more than one trade (e.g.
  // "Electrical" + "Emergency Plumbing") in the same request.
  services: string[];
  // Shown only when "Other" is checked, so a need that isn't one of the
  // listed options can still be typed in rather than forced into a
  // mismatched category.
  otherDetail: string;
  message: string;
  // Honeypot field — real users never fill this in (hidden from view,
  // skipped by screen readers via aria-hidden + tabIndex=-1). Bots that
  // blindly fill every input will trip it. This is a client-side-only
  // deterrent; a real backend should still validate it server-side.
  company: string;
}

interface ContactFormProps {
  // Pre-selects a service option when the form is embedded on a page that
  // already has that context (e.g. a specific service or category page),
  // so the visitor doesn't have to re-pick something they already navigated
  // to. Falls back to the plain /contact behavior when omitted.
  defaultService?: string;
  // Single-column layout with the "Tell us more" field dropped, for
  // embedding in a narrow sidebar (service pages) rather than a full-width
  // page section (the main /contact page).
  compact?: boolean;
  // Resolved icon URLs keyed by option label, built server-side (see
  // src/lib/formServiceIcons.ts) since a React island can't use Astro's
  // <Image> pipeline directly. An option with no matching entry (e.g.
  // "Other") just renders without an icon.
  serviceIconUrls?: Record<string, string>;
}

const OTHER = 'Other';

const services = [
  'Emergency Plumbing',
  'Drain Cleaning',
  'Water Heaters',
  'Sewer Repair',
  'Heating & HVAC',
  'Air Conditioning',
  'Electrical',
  'Septic',
  OTHER,
];

const phonePattern = /^[\d\s()+.-]{7,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.';
  else if (!phonePattern.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.services.length === 0) errors.services = 'Please select at least one option.';
  if (values.services.includes(OTHER) && !values.otherDetail.trim()) {
    errors.otherDetail = 'Please tell us what you need.';
  }
  return errors;
}

export default function ContactForm({ defaultService, compact = false, serviceIconUrls }: ContactFormProps) {
  // Service pages pass their own name (e.g. "Panel Upgrades"), which isn't
  // always one of the general categories below — add it as its own option
  // rather than forcing a mismatch or silently dropping the context.
  const serviceOptions = useMemo(
    () => (defaultService && !services.includes(defaultService) ? [defaultService, ...services] : services),
    [defaultService]
  );

  const [values, setValues] = useState<FormValues>(() => ({
    name: '',
    phone: '',
    email: '',
    message: '',
    company: '',
    otherDetail: '',
    services: defaultService ? [defaultService] : [],
  }));
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const formId = useId();

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleService(service: string) {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ ...values }));
  }

  // TODO: INTEGRATION REQUIRED — no form backend/CRM/email provider has been
  // confirmed for this project yet. Validation, spam-deterrence (honeypot),
  // and the full submit state machine (idle/submitting/success/error) are
  // production-ready on the frontend. The single integration boundary is the
  // fetch call below: point it at a real endpoint (serverless function,
  // Formspree, the CRM Beacon actually uses, etc.) and this component needs
  // no further changes. Never simulate a fake success — the UI must reflect
  // the real outcome once a backend exists.
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values.company) {
      // Honeypot tripped — silently drop without revealing the trap to bots.
      setStatus('success');
      return;
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, phone: true, email: true, services: true, otherDetail: true, message: true });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT as string | undefined;
      if (!endpoint) {
        throw new Error('No form endpoint configured');
      }
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        company: values.company,
        services: values.services,
        otherDetail: values.services.includes(OTHER) ? values.otherDetail : undefined,
      };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className={`rounded-xl border border-brand-200 bg-brand-50 text-center ${compact ? 'p-5' : 'p-8'}`}>
        <p className="font-display text-lg font-semibold text-brand-700">Thank you. We received your request.</p>
        <p className="mt-2 text-sm text-ink-500">A member of our team will reach out shortly.</p>
      </div>
    );
  }

  const fieldError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {status === 'error' && (
        <div role="alert" className="rounded-md border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Online request submission isn&rsquo;t connected yet. Please call us directly for immediate help.
        </div>
      )}

      {/* Honeypot — hidden from sighted users and assistive tech alike. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div className={`grid grid-cols-1 gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-ink-700">
            Full name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldError('name'))}
            aria-describedby={fieldError('name') ? `${formId}-name-error` : undefined}
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`rounded-md border px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:ring-2 ${
              fieldError('name') ? 'border-accent-400 focus:border-accent-500 focus:ring-accent-100' : 'border-ink-200 focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {fieldError('name') && (
            <p id={`${formId}-name-error`} className="text-xs text-accent-600">{fieldError('name')}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-ink-700">
            Phone number
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={Boolean(fieldError('phone'))}
            aria-describedby={fieldError('phone') ? `${formId}-phone-error` : undefined}
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`rounded-md border px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:ring-2 ${
              fieldError('phone') ? 'border-accent-400 focus:border-accent-500 focus:ring-accent-100' : 'border-ink-200 focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {fieldError('phone') && (
            <p id={`${formId}-phone-error`} className="text-xs text-accent-600">{fieldError('phone')}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-email`} className="text-sm font-medium text-ink-700">
          Email address
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fieldError('email'))}
          aria-describedby={fieldError('email') ? `${formId}-email-error` : undefined}
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`rounded-md border px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:ring-2 ${
            fieldError('email') ? 'border-accent-400 focus:border-accent-500 focus:ring-accent-100' : 'border-ink-200 focus:border-brand-500 focus:ring-brand-100'
          }`}
        />
        {fieldError('email') && (
          <p id={`${formId}-email-error`} className="text-xs text-accent-600">{fieldError('email')}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span id={`${formId}-services-label`} className="text-sm font-medium text-ink-700">
          What do you need help with? <span className="font-normal text-ink-400">(select all that apply)</span>
        </span>
        <div
          role="group"
          aria-labelledby={`${formId}-services-label`}
          aria-invalid={Boolean(fieldError('services'))}
          aria-describedby={fieldError('services') ? `${formId}-services-error` : undefined}
          className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'} ${fieldError('services') ? 'rounded-md ring-1 ring-accent-400' : ''}`}
        >
          {serviceOptions.map((service) => {
            const checked = values.services.includes(service);
            const iconUrl = serviceIconUrls?.[service];
            return (
              <label
                key={service}
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-md border px-2.5 py-3 text-center text-xs font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500 ${
                  checked
                    ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-500'
                    : 'border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50/60'
                }`}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={checked}
                  onChange={() => toggleService(service)}
                  onBlur={() => handleBlur('services')}
                  className="sr-only"
                />
                {iconUrl ? (
                  <img src={iconUrl} alt="" className="h-8 w-8 shrink-0 object-contain" />
                ) : service === OTHER ? (
                  // No real icon for a catch-all option — a plain outline
                  // glyph rather than pretending it's part of the 3D set.
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500">
                    <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                      <circle cx="4" cy="10" r="1.6" />
                      <circle cx="10" cy="10" r="1.6" />
                      <circle cx="16" cy="10" r="1.6" />
                    </svg>
                  </span>
                ) : (
                  <span className="h-8 w-8 shrink-0" aria-hidden="true" />
                )}
                <span className="leading-tight">{service}</span>
              </label>
            );
          })}
        </div>
        {fieldError('services') && (
          <p id={`${formId}-services-error`} className="text-xs text-accent-600">{fieldError('services')}</p>
        )}
      </div>

      {values.services.includes(OTHER) && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-other`} className="text-sm font-medium text-ink-700">
            Tell us what you need
          </label>
          <input
            id={`${formId}-other`}
            name="otherDetail"
            type="text"
            placeholder="Describe the issue or service you're looking for"
            aria-invalid={Boolean(fieldError('otherDetail'))}
            aria-describedby={fieldError('otherDetail') ? `${formId}-other-error` : undefined}
            value={values.otherDetail}
            onChange={(e) => handleChange('otherDetail', e.target.value)}
            onBlur={() => handleBlur('otherDetail')}
            className={`rounded-md border px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:ring-2 ${
              fieldError('otherDetail') ? 'border-accent-400 focus:border-accent-500 focus:ring-accent-100' : 'border-ink-200 focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {fieldError('otherDetail') && (
            <p id={`${formId}-other-error`} className="text-xs text-accent-600">{fieldError('otherDetail')}</p>
          )}
        </div>
      )}

      {!compact && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-message`} className="text-sm font-medium text-ink-700">
            Tell us more
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="resize-none rounded-md border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex items-center justify-center rounded-md bg-accent-600 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request Service'}
      </button>
      {!compact && (
        <p className="text-xs text-ink-500">
          For urgent issues, please call us directly rather than submitting a form.
        </p>
      )}
    </form>
  );
}
