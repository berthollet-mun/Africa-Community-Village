import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Container } from './Container';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  homeLabel: string;
  currentLabel: string;
  onHome: () => void;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  align?: 'left' | 'center';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  homeLabel,
  currentLabel,
  onHome,
  icon,
  actions,
  align = 'left'
}) => {
  const centered = align === 'center';

  return (
    <section className="acv-page-header relative overflow-hidden border-b border-[#D9CBAF] bg-[#F3EDE1]">
      <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#EFA62B]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-[10%] h-60 w-60 rounded-full bg-[#14798B]/8 blur-3xl" />
      <Container className="relative py-8 sm:py-10 lg:py-12">
        <nav
          aria-label="Breadcrumb"
          className={`mb-5 flex items-center gap-1.5 font-label text-[11px] font-bold uppercase tracking-[0.14em] text-[#5E665F] ${
            centered ? 'justify-center' : ''
          }`}
        >
          <button type="button" onClick={onHome} className="min-h-11 rounded-md px-1 hover:text-[#690C07]">
            {homeLabel}
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-[#9B8E78]" aria-hidden="true" />
          <span className="truncate text-[#690C07]" aria-current="page">
            {currentLabel}
          </span>
        </nav>

        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <div className={`mb-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
            {icon && (
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#E4C17A] bg-[#FFF8EA] text-[#690C07]">
                {icon}
              </span>
            )}
            <span className="font-label text-xs font-bold uppercase tracking-[0.16em] text-[#690C07]">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-[#232826] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className={`mt-4 max-w-3xl text-sm leading-7 text-[#4B5550] sm:text-base ${centered ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
          {actions && <div className={`mt-6 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div>}
        </div>
      </Container>
    </section>
  );
};
