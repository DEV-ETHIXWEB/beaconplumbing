import { useId, useState } from 'react';
import type { FAQItem } from '../../lib/seo';

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col divide-y divide-ink-100 rounded-xl border border-ink-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-ink-900 hover:text-brand-600"
              >
                <span>{item.question}</span>
                <svg
                  viewBox="0 0 20 20"
                  className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5.5 7.5l4.5 4.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm leading-relaxed text-ink-500"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
