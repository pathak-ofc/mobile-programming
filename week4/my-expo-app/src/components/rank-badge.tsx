import { Text, View } from 'react-native';

/** Small uppercase rank chip. Teal border = verified rank context. */
export default function RankBadge({ rank }: { rank: string }) {
  return (
    <View className="self-start rounded border border-valo-accent bg-valo-accent/10 px-2 py-1">
      <Text className="font-display-semibold text-[11px] tracking-[1px] text-valo-accent">
        {rank.toUpperCase()}
      </Text>
    </View>
  );
}
