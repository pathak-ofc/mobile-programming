import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'ghost' | 'text';

interface Props extends PressableProps {
  title: string;
  variant?: Variant;
  small?: boolean;
}

/**
 * Flat Valorant buttons (see week1 .button): primary = solid red,
 * ghost = dark panel + line border, text = plain red text.
 * Pressed state via the `active:` variant — no style functions.
 */
export default function Button({ title, variant = 'primary', small, ...rest }: Props) {
  if (variant === 'primary') {
    return (
      <Pressable
        {...rest}
        accessibilityRole="button"
        accessibilityLabel={title}
        className={
          small
            ? 'min-h-[44px] items-center justify-center rounded border border-valo-red bg-valo-red px-[14px] shadow-lg shadow-valo-red/30 active:opacity-80'
            : 'min-h-[48px] items-center justify-center rounded border border-valo-red bg-valo-red px-5 shadow-lg shadow-valo-red/30 active:opacity-80'
        }>
        <Text
          className={
            small
              ? 'font-display text-xs tracking-[1px] text-valo-white'
              : 'font-display text-[13px] tracking-[1px] text-valo-white'
          }>
          {title.toUpperCase()}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      accessibilityLabel={title}
      className={
        variant === 'ghost'
          ? 'min-h-[48px] items-center justify-center rounded border border-valo-line bg-valo-panel px-[18px] active:opacity-80'
          : 'min-h-[44px] min-w-[44px] items-center justify-center px-3 active:opacity-80'
      }>
      <Text
        className={
          variant === 'ghost'
            ? 'font-display text-[13px] tracking-[1px] text-valo-text'
            : 'font-display text-[13px] tracking-[1px] text-valo-red'
        }>
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}
