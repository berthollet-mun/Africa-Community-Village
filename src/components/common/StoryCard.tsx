import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProgressiveImage } from './ProgressiveImage';

interface StoryCardProps {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  excerpt?: string;
  meta?: string;
  actionLabel?: string;
  onAction?: () => void;
  featured?: boolean;
  className?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  image,
  alt,
  eyebrow,
  title,
  excerpt,
  meta,
  actionLabel,
  onAction,
  featured = false,
  className = ''
}) => {
  const content = (
    <>
      <ProgressiveImage
        src={image}
        alt={alt}
        wrapperClassName={`${featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]' : 'aspect-[4/3]'} w-full`}
        imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {eyebrow && <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[#690C07]">{eyebrow}</p>}
        <h3 className={`${eyebrow ? 'mt-2' : ''} text-balance font-display text-xl font-black leading-tight text-[#232826] sm:text-2xl`}>
          {title}
        </h3>
        {excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4B5550]">{excerpt}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          {meta && <span className="font-label text-[10px] uppercase tracking-wider text-[#4B5550]">{meta}</span>}
          {actionLabel && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#690C07]">
              {actionLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const classes = `group flex h-full overflow-hidden rounded-[1.5rem] border border-[#E2D7C3] bg-[#FAF6EF] text-left shadow-[0_16px_45px_-35px_rgba(35,40,38,0.65)] ${featured ? 'flex-col lg:grid lg:grid-cols-[1.35fr_1fr]' : 'flex-col'} ${className}`;

  return onAction ? (
    <button type="button" onClick={onAction} className={classes} aria-label={`${actionLabel ?? ''} ${title}`.trim()}>
      {content}
    </button>
  ) : (
    <article className={classes}>{content}</article>
  );
};
