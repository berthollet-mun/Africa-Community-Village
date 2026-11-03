import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'terracotta'
  | 'cyan'
  | 'outline'
  | 'ghost'
  | 'dark';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  className = '',
  onClick,
  onPointerDown,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const hasCustomDisplay = /\b(hidden|block|inline-block|flex|inline-flex|grid)\b/.test(className);
  const baseStyles =
    `${hasCustomDisplay ? '' : 'inline-flex'} acv-magnetic-button acv-button-shimmer relative isolate overflow-hidden items-center justify-center font-label font-bold tracking-wider uppercase transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 rounded-full`;

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-[11px] px-3.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 gap-2',
    lg: 'text-xs sm:text-sm px-7 sm:px-8 py-3.5 sm:py-4 gap-2.5'
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#690C07] hover:bg-[#520905] text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#690C07]',
    secondary:
      'bg-[#EFA62B] hover:bg-[#D98E16] text-[#232826] font-bold shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#EFA62B]',
    terracotta:
      'bg-[#8B1510] hover:bg-[#690C07] text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#8B1510]',
    cyan:
      'bg-[#14798B] hover:bg-[#0F5F6D] text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#14798B]',
    dark:
      'bg-[#232826] hover:bg-black text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#232826]',
    outline:
      'bg-transparent hover:bg-[#F3EDE1] text-[#690C07] border-2 border-[#690C07] hover:border-[#520905] focus-visible:ring-[#690C07]',
    ghost:
      'bg-transparent hover:bg-[#690C07]/10 text-[#690C07] hover:text-[#520905] focus-visible:ring-[#690C07]'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (isDisabled || event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--magnetic-x', `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
    event.currentTarget.style.setProperty('--magnetic-y', `${(event.clientY - rect.top - rect.height / 2) * 0.14}px`);
  };

  const resetMagnet = () => {
    buttonRef.current?.style.setProperty('--magnetic-x', '0px');
    buttonRef.current?.style.setProperty('--magnetic-y', '0px');
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() });
    window.setTimeout(() => setRipple(null), 520);
    onPointerDown?.(event);
  };

  return (
    <button
      {...props}
      ref={buttonRef}
      disabled={isDisabled}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnet}
      onPointerDown={handlePointerDown}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {ripple && (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="acv-button-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span className="relative z-10">{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="relative z-10 shrink-0">{icon}</span>}
          <span className="relative z-10">{children}</span>
          {icon && iconPosition === 'right' && <span className="relative z-10 shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
