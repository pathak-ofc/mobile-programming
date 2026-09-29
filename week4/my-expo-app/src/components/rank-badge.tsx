import { Text, View } from 'react-native';

/** Small uppercase rank chip. Red border = verified rank context. */
export default function RankBadge({ rank }: { rank: string }) {
  return (
    <View className="self-start rounded border border-valo-red bg-valo-red/10 px-2 py-1">
      <Text className="font-display-semibold text-[11px] tracking-[1px] text-valo-red">
        {rank.toUpperCase()}
      </Text>
    </View>
  );
}
