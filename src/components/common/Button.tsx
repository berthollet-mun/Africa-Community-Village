import React from 'react';
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
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const hasCustomDisplay = /\b(hidden|block|inline-block|flex|inline-flex|grid)\b/.test(className);
  const baseStyles =
    `${hasCustomDisplay ? '' : 'inline-flex'} items-center justify-center font-label font-bold tracking-wider uppercase transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed disabled:opacity-60 rounded-full`;

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
      'bg-[#0E7490] hover:bg-[#095368] text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#0E7490]',
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

  return (
    <button
      {...props}
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
