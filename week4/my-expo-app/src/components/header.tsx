import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

interface HeaderProps {
  title: string;
  unreadCount?: number;
}

/** Main screen header: title left, chat and bell icons right (UI only, no navigation). */
export default function Header({ title, unreadCount = 0 }: HeaderProps) {
  return (
    <View className="min-h-[64px] flex-row items-center justify-between border-b border-valo-line bg-valo-bg px-4">
      <Text className="font-display text-xl tracking-[2px] text-valo-text">{title.toUpperCase()}</Text>
      <View className="flex-row items-center gap-1">
        <Pressable accessibilityRole="button" accessibilityLabel="Open chats" className="h-[44px] w-[44px] items-center justify-center active:opacity-70">
          <Ionicons name="chatbubble-ellipses-outline" size={21} color={colors.text} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Open notifications, ${unreadCount} unread`} className="relative h-[44px] w-[44px] items-center justify-center active:opacity-70">
          <Ionicons name="notifications-outline" size={21} color={colors.text} />
          {unreadCount > 0 ? (
            <View className="absolute right-1 top-1 min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-valo-danger px-1">
              <Text className="font-display-semibold text-[10px] text-valo-white">{unreadCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}
