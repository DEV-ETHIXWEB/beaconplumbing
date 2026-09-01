import { useId, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldName = 'name' | 'phone' | 'email' | 'service' | 'message';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  // Honeypot field — real users never fill this in (hidden from view,
  // skipped by screen readers via aria-hidden + tabIndex=-1). Bots that
  // blindly fill every input will trip it. This is a client-side-only
  // deterrent; a real backend should still validate it server-side.
  company: string;
}

const initialValues: FormValues = { name: '', phone: '', email: '', service: '', message: '', company: '' };

const services = [
  'Emergency Plumbing',
  'Drain Cleaning',
  'Water Heaters',
  'Sewer Repair',
  'Heating & HVAC',
  'Air Conditioning',
  'Electrical',
  'Septic',
  'Other',
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
  if (!values.service) errors.service = 'Please select a service.';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const formId = useId();

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
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
    setTouched({ name: true, phone: true, email: true, service: true, message: true });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT as string | undefined;
      if (!endpoint) {
        throw new Error('No form endpoint configured');
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        <span id={`${formId}-service-label`} className="text-sm font-medium text-ink-700">
          What do you need help with?
        </span>
        <div
          role="radiogroup"
          aria-labelledby={`${formId}-service-label`}
          aria-invalid={Boolean(fieldError('service'))}
          aria-describedby={fieldError('service') ? `${formId}-service-error` : undefined}
          className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${fieldError('service') ? 'rounded-md ring-1 ring-accent-400' : ''}`}
        >
          {services.map((service) => {
            const checked = values.service === service;
            return (
              <label
                key={service}
                className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500 ${
                  checked
                    ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-500'
                    : 'border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50/60'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={checked}
                  required
                  onChange={() => handleChange('service', service)}
                  onBlur={() => handleBlur('service')}
                  className="sr-only"
                />
                {service}
              </label>
            );
          })}
        </div>
        {fieldError('service') && (
          <p id={`${formId}-service-error`} className="text-xs text-accent-600">{fieldError('service')}</p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex items-center justify-center rounded-md bg-accent-600 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request Service'}
      </button>
      <p className="text-xs text-ink-500">
        For urgent issues, please call us directly rather than submitting a form.
      </p>
    </form>
  );
}
