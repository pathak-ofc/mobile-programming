import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, Text, View } from 'react-native';

const TABS = [
  { name: 'index', href: '/', label: 'Home' },
  { name: 'scrims', href: '/scrims', label: 'Scrims' },
  { name: 'team', href: '/team', label: 'Team' },
  { name: 'chat', href: '/chat', label: 'Chat' },
  { name: 'profile', href: '/profile', label: 'Profile' },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <View className="flex-row items-center justify-center gap-2 border-t border-valo-line bg-valo-deep p-4">
          {TABS.map((t) => (
            <TabTrigger key={t.name} name={t.name} href={t.href as '/'} asChild>
              <TabButton>{t.label}</TabButton>
            </TabTrigger>
          ))}
        </View>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} accessibilityRole="tab" className="active:opacity-70">
      <View className="min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-4 py-2.5">
        <Text
          className={
            isFocused
              ? 'font-display-semibold text-xs uppercase tracking-[1px] text-valo-red'
              : 'font-display-semibold text-xs uppercase tracking-[1px] text-valo-muted'
          }>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
