import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { colors } from '@/theme/colors';

/** Friendly empty state. Used for Action needed + any empty list. */
export default function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View className="items-center gap-2 rounded-lg border border-valo-line bg-valo-panel p-8">
      <View className="h-[52px] w-[52px] items-center justify-center rounded-full border border-valo-red bg-valo-red/10">
        <Ionicons name="checkmark-circle-outline" size={28} color={colors.red} />
      </View>
      <Text className="text-center font-display text-[15px] text-valo-text">{title}</Text>
      <Text className="text-center font-body text-[13px] leading-[19px] text-valo-muted">{body}</Text>
    </View>
  );
}
