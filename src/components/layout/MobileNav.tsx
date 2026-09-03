import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Business } from '../../data/business';
import type { NavLink } from '../../data/navigation';

interface Props {
  business: Business;
  mainNav: NavLink[];
}

export default function MobileNav({ business, mainNav }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 xl:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-100 xl:hidden">
          <div
            className="absolute inset-0 bg-ink-950/50 animate-fade-up"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
              <span className="font-display text-lg font-bold text-ink-900">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-2 py-3" aria-label="Mobile primary">
              {mainNav.map((item) => (
                <div key={item.href} className="border-b border-ink-50 last:border-0">
                  <a
                    href={item.href}
                    className="block px-3 py-3 text-base font-semibold text-ink-800"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="flex flex-col pb-2 pl-3">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="rounded-md px-3 py-2 text-sm text-ink-500 hover:bg-brand-50 hover:text-brand-600"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t border-ink-100 p-4">
              <a
                href={business.phone.href}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-600 px-5 py-3 font-display font-semibold text-white"
              >
                Call {business.phone.display}
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
