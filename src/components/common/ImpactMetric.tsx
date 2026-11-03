import React from 'react';

interface ImpactMetricProps {
  value: React.ReactNode;
  label: string;
  detail?: string;
  index?: number;
  className?: string;
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({ value, label, detail, index, className = '' }) => (
  <article className={`group border-l-2 border-[#EFA62B] pl-4 sm:pl-5 ${className}`}>
    {typeof index === 'number' && (
      <span className="font-label text-[10px] font-bold tracking-[0.18em] text-[#690C07]/55">
        {String(index + 1).padStart(2, '0')}
      </span>
    )}
    <p className="mt-1 font-display text-3xl font-black tracking-tight text-[#690C07] sm:text-4xl">{value}</p>
    <p className="mt-1 text-sm font-bold text-[#232826]">{label}</p>
    {detail && <p className="mt-1 text-xs leading-5 text-[#4B5550]">{detail}</p>}
  </article>
);
