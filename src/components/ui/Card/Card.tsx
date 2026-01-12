// Card Component

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, padding = 'md', className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gray-800 border border-gray-700',
      bordered: 'bg-transparent border-2 border-gray-700',
      elevated: 'bg-gray-800 shadow-lg',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:bg-gray-750 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
