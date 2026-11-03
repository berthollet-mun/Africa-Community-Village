import React, { useState } from 'react';

interface ProgressiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  wrapperClassName = '',
  imageClassName = '',
  priority = false,
  alt,
  src,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden bg-[#EAE3D5] ${wrapperClassName}`}>
      {!loaded && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-[#EAE3D5]" />}
      <img
        {...props}
        src={src}
        alt={alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${imageClassName} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  );
};
