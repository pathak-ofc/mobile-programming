import { Text, View } from 'react-native';

import Button from '@/components/button';
import StatusChip from '@/components/status-chip';
import type { BoardRequest } from '@/data/mock';

interface Props {
  item: BoardRequest;
  onRequest?: (id: string) => void;
}

/** One open scrim request row. HOT gets a red left edge. */
export default function ScrimRequestCard({ item, onRequest }: Props) {
  return (
    <View
      className={
        item.hot
          ? 'gap-2 rounded-lg border border-valo-line border-l-4 border-l-valo-red bg-valo-panel p-4'
          : 'gap-2 rounded-lg border border-valo-line bg-valo-panel p-4'
      }>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-2">
          <Text className="font-display text-base text-valo-text">{item.team}</Text>
          {item.hot ? (
            <View className="rounded bg-valo-red px-1.5 py-0.5">
              <Text className="font-display text-[10px] tracking-[1px] text-valo-white">HOT</Text>
            </View>
          ) : null}
        </View>
        <Text className="font-display text-base text-valo-red">{item.rating}</Text>
      </View>
      <Text className="font-body text-xs leading-[17px] text-valo-muted">
        {item.rankBand} · {item.time} · {item.format} · {item.region}
      </Text>
      <View className="mt-1 flex-row items-center justify-between">
        <StatusChip status={item.locked ? 'pending' : 'open'} />
        {item.locked ? (
          <Text className="font-display-semibold text-[11px] tracking-[0.5px] text-valo-dim">
            Locked — kickoff soon
          </Text>
        ) : (
          <Button
            title="Request scrim"
            small
            onPress={() => onRequest?.(item.id)}
            accessibilityLabel={`Request scrim against ${item.team}`}
          />
        )}
      </View>
    </View>
  );
}
