import React from 'react';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { SkeletonCard } from './Skeleton';

interface StateProps {
  title: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<{ label: string; cards?: number; className?: string }> = ({
  label,
  cards = 3,
  className = ''
}) => (
  <div className={className} role="status" aria-live="polite" aria-busy="true">
    <span className="sr-only">{label}</span>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: cards }).map((_, index) => <SkeletonCard key={index} variant="article" />)}
    </div>
  </div>
);

export const EmptyState: React.FC<StateProps> = ({ title, description, className = '' }) => (
  <div className={`rounded-[1.5rem] border border-dashed border-[#CFC2AD] bg-[#FAF6EF] px-6 py-12 text-center ${className}`} role="status">
    <Inbox className="mx-auto h-9 w-9 text-[#690C07]" aria-hidden="true" />
    <h3 className="mt-4 font-display text-xl font-black text-[#232826]">{title}</h3>
    {description && <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#4B5550]">{description}</p>}
  </div>
);

export const ErrorState: React.FC<StateProps & { retryLabel: string; onRetry: () => void; compact?: boolean }> = ({
  title,
  description,
  retryLabel,
  onRetry,
  compact = false,
  className = ''
}) => (
  <div
    className={`rounded-[1.5rem] border border-[#690C07]/20 bg-[#F9EBEA] ${compact ? 'flex items-center justify-between gap-4 p-4 text-left' : 'px-6 py-10 text-center'} ${className}`}
    role="alert"
  >
    <div className={compact ? 'flex min-w-0 items-start gap-3' : ''}>
      <AlertTriangle className={`${compact ? 'mt-0.5 h-5 w-5' : 'mx-auto h-9 w-9'} shrink-0 text-[#690C07]`} aria-hidden="true" />
      <div>
        <h3 className={`${compact ? 'text-sm' : 'mt-4 text-xl'} font-display font-black text-[#232826]`}>{title}</h3>
        {description && <p className={`${compact ? 'mt-1' : 'mx-auto mt-2 max-w-lg'} text-sm leading-6 text-[#4B5550]`}>{description}</p>}
      </div>
    </div>
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onRetry}
      icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
      className={compact ? 'shrink-0' : 'mt-5'}
    >
      {retryLabel}
    </Button>
  </div>
);
