import { Text, View } from 'react-native';

export type StatusKind = 'open' | 'pending' | 'confirmed' | 'disputed' | 'live';

const LABEL: Record<StatusKind, string> = {
  open: 'OPEN',
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  disputed: 'DISPUTED',
  live: 'LIVE',
};

const WRAP: Record<StatusKind, string> = {
  open: 'border-valo-red bg-valo-red/10',
  pending: 'border-valo-text/40 bg-valo-text/10',
  confirmed: 'border-valo-red bg-valo-panel',
  disputed: 'border-valo-reddark bg-valo-reddark',
  live: 'border-valo-red bg-valo-red',
};

const TEXT: Record<StatusKind, string> = {
  open: 'text-valo-red',
  pending: 'text-valo-text',
  confirmed: 'text-valo-red',
  disputed: 'text-valo-white',
  live: 'text-valo-white',
};

export default function StatusChip({ status }: { status: StatusKind }) {
  return (
    <View className={`self-start rounded border px-2 py-1 ${WRAP[status]}`}>
      <Text className={`font-display-semibold text-[10px] tracking-[1.2px] ${TEXT[status]}`}>
        {LABEL[status]}
      </Text>
    </View>
  );
}
