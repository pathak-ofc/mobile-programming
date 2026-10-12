import { Text, View } from 'react-native';

interface AvatarProps {
  initials: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

const SIZE = {
  small: 'h-9 w-9',
  medium: 'h-12 w-12',
  large: 'h-20 w-20',
} as const;

const TEXT = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-xl',
} as const;

export default function Avatar({ initials, size = 'medium', label }: AvatarProps) {
  return (
    <View accessibilityLabel={label ?? `Avatar ${initials}`} className={`${SIZE[size]} items-center justify-center rounded-lg border border-valo-accent/40 bg-valo-accent/10`}>
      <Text className={`font-display-semibold ${TEXT[size]} text-valo-accent`}>{initials.slice(0, 3).toUpperCase()}</Text>
    </View>
  );
}
