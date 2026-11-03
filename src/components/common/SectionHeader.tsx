import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className = ''
}) => {
  const centered = align === 'center';
  const dark = tone === 'dark';

  return (
    <header className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`mb-3 font-label text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-[#F8C867]' : 'text-[#690C07]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-balance font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-[#232826]'}`}>
        {title}
      </h2>
      {description && (
        <div className={`mt-4 text-pretty text-sm leading-7 sm:text-base ${dark ? 'text-white/72' : 'text-[#4B5550]'}`}>
          {description}
        </div>
      )}
    </header>
  );
};
