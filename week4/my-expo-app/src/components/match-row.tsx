import { Text, View } from 'react-native';

import StatusChip, { type StatusKind } from '@/components/status-chip';
import type { RecentMatch } from '@/data/mock';

const STATUS: Record<RecentMatch['status'], StatusKind> = {
  confirmed: 'confirmed',
  pending: 'pending',
  disputed: 'disputed',
};

/** Opponent, score, rating delta, status chip. */
export default function MatchRow({ match }: { match: RecentMatch }) {
  const positive = match.delta >= 0;
  return (
    <View
      className={
        match.status === 'disputed'
          ? 'flex-row items-center justify-between rounded-lg border border-valo-line border-l-4 border-l-valo-red bg-valo-panel p-4'
          : 'flex-row items-center justify-between rounded-lg border border-valo-line bg-valo-panel p-4'
      }>
      <View className="flex-1 gap-0.5">
        <Text className="font-display text-[15px] text-valo-text">{match.opponent}</Text>
        <Text className="font-body text-xs text-valo-muted">
          {match.map} · {match.score}
        </Text>
      </View>
      <View className="items-end gap-1.5">
        <Text
          className={positive ? 'font-display text-[15px] text-valo-text' : 'font-display text-[15px] text-valo-red'}>
          {positive ? `+${match.delta}` : match.delta}
        </Text>
        <StatusChip status={STATUS[match.status]} />
      </View>
    </View>
  );
}
