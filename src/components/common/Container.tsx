import React from 'react';

type ContainerWidth = 'narrow' | 'content' | 'wide';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'main';
  width?: ContainerWidth;
}

const widths: Record<ContainerWidth, string> = {
  narrow: 'max-w-3xl',
  content: 'max-w-6xl',
  wide: 'max-w-7xl'
};

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  width = 'wide',
  className = '',
  children,
  ...props
}) => (
  <Component className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widths[width]} ${className}`} {...props}>
    {children}
  </Component>
);
