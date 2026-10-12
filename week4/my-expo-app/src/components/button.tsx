import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'ghost' | 'text' | 'destructive';

interface Props extends PressableProps {
  title: string;
  variant?: Variant;
  small?: boolean;
}

export default function Button({ title, variant = 'primary', small, ...rest }: Props) {
  const compact = small ? 'min-h-[44px] px-[14px]' : 'min-h-[48px] px-5';
  const container = {
    primary: `items-center justify-center rounded border border-valo-accent bg-valo-accent shadow-lg shadow-valo-accent/30 active:opacity-80 ${compact}`,
    ghost: `items-center justify-center rounded border border-valo-line bg-valo-panel active:opacity-80 ${compact}`,
    text: 'min-h-[44px] min-w-[44px] items-center justify-center px-3 active:opacity-80',
    destructive: `items-center justify-center rounded border border-valo-danger bg-valo-danger active:opacity-80 ${compact}`,
  }[variant];
  const textColor = variant === 'primary' ? 'text-valo-white' : variant === 'destructive' ? 'text-valo-white' : variant === 'text' ? 'text-valo-danger' : 'text-valo-text';

  return (
    <Pressable {...rest} accessibilityRole="button" accessibilityLabel={title} className={container}>
      <Text className={`font-display text-[13px] tracking-[1px] ${textColor}`}>{title.toUpperCase()}</Text>
    </Pressable>
  );
}
