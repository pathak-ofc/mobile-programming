import { Pressable, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  destructive?: boolean;
}

export default function Chip({ label, selected = false, onPress, destructive = false }: ChipProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`min-h-[36px] justify-center rounded-full border px-3 ${selected ? 'border-valo-accent bg-valo-accent/10' : destructive ? 'border-valo-danger/60 bg-valo-danger/10' : 'border-valo-line bg-valo-panel'}`}>
      <Text className={`font-body-medium text-xs ${selected ? 'text-valo-accent' : destructive ? 'text-valo-danger' : 'text-valo-muted'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
