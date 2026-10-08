import { Text, View } from 'react-native';

/** Last-5 W/L pips. Wins cream, losses red. */
export default function WLPips({ results }: { results: readonly ('W' | 'L')[] }) {
  return (
    <View className="flex-row gap-1.5">
      {results.map((r, i) => (
        <View
          key={i}
          className={
            r === 'W'
              ? 'h-7 w-7 items-center justify-center rounded border border-valo-text bg-valo-text/10'
              : 'h-7 w-7 items-center justify-center rounded border border-valo-red bg-valo-red/10'
          }>
          <Text
            className={
              r === 'W' ? 'font-display text-xs text-valo-text' : 'font-display text-xs text-valo-red'
            }>
            {r}
          </Text>
        </View>
      ))}
    </View>
  );
}
