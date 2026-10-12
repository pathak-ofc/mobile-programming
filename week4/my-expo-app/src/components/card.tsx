import { View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export default function Card({ children, className = '', featured = false, ...props }: CardProps) {
  return (
    <View
      {...props}
      className={`rounded-lg border border-valo-line bg-valo-panel p-4 ${featured ? 'border-valo-accent/60' : ''} ${className}`}>
      {children}
    </View>
  );
}
