import { Pressable, Text, View } from 'react-native';

import Button from '@/components/button';
import LiveDot from '@/components/live-dot';
import type { ActionItem } from '@/data/mock';
import { colors } from '@/theme/colors';

interface Props {
  item: ActionItem;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

/** Action-needed inbox row. Red left edge = needs you. */
export default function NotificationItem({ item, onAccept, onDecline }: Props) {
  const needsChoice = item.kind === 'scrim-request' || item.kind === 'team-invite';
  return (
    <View className="gap-2 rounded-lg border border-valo-line border-l-4 border-l-valo-red bg-valo-panel p-4">
      <View className="flex-row items-center gap-2">
        <LiveDot color={colors.red} />
        <Text className="flex-1 font-display-semibold text-sm text-valo-text">{item.title}</Text>
      </View>
      <Text className="font-body text-[13px] leading-[19px] text-valo-muted">{item.detail}</Text>
      <View className="mt-1 flex-row items-center justify-between">
        <Text className="font-body text-[11px] text-valo-dim">{item.time}</Text>
        {needsChoice ? (
          <View className="flex-row gap-2">
            <Button
              title="Decline"
              variant="ghost"
              small
              onPress={() => onDecline?.(item.id)}
              accessibilityLabel={`Decline ${item.title}`}
            />
            <Button
              title="Accept"
              small
              onPress={() => onAccept?.(item.id)}
              accessibilityLabel={`Accept ${item.title}`}
            />
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.title}`}
            className="min-h-[44px] min-w-[44px] justify-center px-2 active:opacity-80">
            <Text className="font-display text-xs tracking-[1px] text-valo-red">
              {item.kind === 'dispute' ? 'ADD PROOF' : 'CONFIRM'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
