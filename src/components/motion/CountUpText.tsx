import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

export const CountUpText: React.FC<{ value: string; className?: string }> = ({ value, className = '' }) => {
  const { ref, display } = useCountUp(value);
  return <span ref={ref} className={className}>{display}</span>;
};
