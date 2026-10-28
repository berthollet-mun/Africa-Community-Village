import Image from 'next/image';

export const ACV_LOGO_SRC = '/assets/brand/acv-logo.jpeg';

interface BrandLogoProps {
  alt?: string;
  className?: string;
  priority?: boolean;
  size?: number;
  sizes?: string;
}

export function BrandLogo({
  alt = 'Logo officiel Africa Community Village (ACV)',
  className = '',
  priority = false,
  size = 96,
  sizes
}: BrandLogoProps) {
  return (
    <Image
      src={ACV_LOGO_SRC}
      alt={alt}
      width={size}
      height={size}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
