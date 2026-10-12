import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/avatar';
import Button from '@/components/button';
import Chip from '@/components/chip';
import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import { colors } from '@/theme/colors';

// ---- Mock data --------------------------------------------------------------

type ScrimStatus = 'open' | 'requested' | 'confirmed';

interface Scrim {
  id: string;
  teamName: string;
  teamTag: string;
  avgRank: string;
  dateLabel: string;
  format: 'Bo1' | 'Bo3';
  region: string;
  status: ScrimStatus;
}

const scrimsOpen: Scrim[] = [
  { id: 's1', teamName: 'NOVA//5', teamTag: 'NV5', avgRank: 'Immortal 3', dateLabel: 'Tonight · 9:00 PM', format: 'Bo3', region: 'South Asia', status: 'open' },
  { id: 's2', teamName: 'BYTE//KINGS', teamTag: 'BTK', avgRank: 'Immortal 2', dateLabel: 'Tonight · 10:00 PM', format: 'Bo1', region: 'South Asia', status: 'open' },
  { id: 's3', teamName: 'LOWKEY//GG', teamTag: 'LKG', avgRank: 'Immortal 3', dateLabel: 'Tomorrow · 7:00 PM', format: 'Bo3', region: 'South Asia', status: 'open' },
];

const scrimsMyRequests: Scrim[] = [
  { id: 's5', teamName: 'RE//ACT', teamTag: 'RX', avgRank: 'Immortal 2', dateLabel: 'Tonight · 8:30 PM', format: 'Bo3', region: 'South Asia', status: 'requested' },
];

const scrimsConfirmed: Scrim[] = [
  { id: 's6', teamName: 'ECHO//FIVE', teamTag: 'EC5', avgRank: 'Ascendant 2', dateLabel: 'Fri · 9:00 PM', format: 'Bo1', region: 'South Asia', status: 'confirmed' },
];

const TOGGLE_OPTIONS = ['Open', 'My requests', 'Confirmed'];
const STATUS_LABEL: Record<ScrimStatus, string> = { open: 'OPEN', requested: 'REQUESTED', confirmed: 'CONFIRMED' };
const ACTION_LABEL: Record<ScrimStatus, string> = { open: 'Request', requested: 'Requested', confirmed: 'Confirmed' };

const FILTER_GROUPS: { label: string; options: string[] }[] = [
  { label: 'Rank range', options: ['Diamond', 'Ascendant', 'Immortal'] },
  { label: 'Map', options: ['Ascent', 'Lotus', 'Sunset'] },
  { label: 'Time', options: ['Tonight', 'Tomorrow', 'This weekend'] },
  { label: 'Region / server', options: ['South Asia', 'SEA', 'Middle East'] },
];

// ---- Small local pieces (only used on this screen) -------------------------

function ScrimsToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="Scrim list filter" className="flex-row rounded-lg border border-valo-line bg-valo-panel p-1">
      {TOGGLE_OPTIONS.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityLabel={option}
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            className={`min-h-[44px] flex-1 items-center justify-center rounded-md px-2 ${selected ? 'bg-valo-accent' : ''}`}>
            <Text className={`font-display-semibold text-[11px] uppercase tracking-[0.8px] ${selected ? 'text-valo-white' : 'text-valo-muted'}`}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function PostScrimFab() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Post scrim"
      className="absolute bottom-24 right-5 h-[56px] w-[56px] items-center justify-center rounded-full border border-valo-accent bg-valo-accent shadow-lg shadow-valo-accent/30 active:opacity-80">
      <Ionicons name="add" size={28} color={colors.white} />
    </Pressable>
  );
}

export default function ScrimsScreen() {
  const [toggle, setToggle] = useState('Open');
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [requested, setRequested] = useState<Record<string, boolean>>({});

  const source = toggle === 'Open' ? scrimsOpen : toggle === 'My requests' ? scrimsMyRequests : scrimsConfirmed;

  const data = useMemo(() => {
    const withLocalRequests = source.map((item) =>
      requested[item.id] && item.status === 'open' ? { ...item, status: 'requested' as const } : item,
    );
    if (!search.trim()) return withLocalRequests;
    return withLocalRequests.filter((item) => item.teamName.toLowerCase().includes(search.toLowerCase()));
  }, [source, search, requested]);

  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header title="Scrims" />
        <View className="gap-3 p-4">
          <View className="flex-row items-center gap-2">
            <View className="min-h-[44px] flex-1 flex-row items-center gap-2 rounded-lg border border-valo-line bg-valo-panel px-3">
              <Ionicons name="search" size={16} color={colors.muted} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search team name"
                placeholderTextColor={colors.dim}
                accessibilityLabel="Search scrims by team name"
                className="flex-1 font-body text-sm text-valo-text"
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open scrim filters"
              onPress={() => setFilterVisible(true)}
              className="h-[44px] w-[44px] items-center justify-center rounded-lg border border-valo-line bg-valo-panel active:opacity-70">
              <Ionicons name="options-outline" size={18} color={colors.text} />
            </Pressable>
          </View>
          <ScrimsToggle value={toggle} onChange={setToggle} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-36"
          renderItem={({ item }) => (
            <View className="flex-row items-center gap-3 rounded-lg border border-valo-line bg-valo-panel p-4">
              <Avatar initials={item.teamTag} />
              <View className="flex-1 gap-1">
                <Text className="font-display text-[15px] text-valo-text">{item.teamName}</Text>
                <Text className="font-body text-xs text-valo-muted">{item.avgRank} · {item.dateLabel}</Text>
                <View className="flex-row items-center gap-2">
                  <Text className="font-body text-[11px] text-valo-dim">{item.format} · {item.region}</Text>
                  <View className="self-start rounded border border-valo-accent bg-valo-accent/10 px-2 py-1">
                    <Text className="font-display-semibold text-[10px] tracking-[1.2px] text-valo-accent">{STATUS_LABEL[item.status]}</Text>
                  </View>
                </View>
              </View>
              <Button
                title={ACTION_LABEL[item.status]}
                small
                variant={item.status === 'open' ? 'primary' : 'ghost'}
                disabled={item.status !== 'open'}
                onPress={() => setRequested((prev) => ({ ...prev, [item.id]: true }))}
                accessibilityLabel={`${ACTION_LABEL[item.status]} scrim against ${item.teamName}`}
              />
            </View>
          )}
          ListEmptyComponent={
            <EmptyState title="No scrims here yet" body="Post a scrim or check back soon — open requests near you will show up here." />
          }
        />

        <PostScrimFab />
      </SafeAreaView>

      {/* Filter sheet — inlined here since only this screen needs it. */}
      <Modal visible={filterVisible} animationType="slide" transparent onRequestClose={() => setFilterVisible(false)}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close filters"
          onPress={() => setFilterVisible(false)}
          className="flex-1 justify-end bg-black/60">
          <Pressable onPress={() => {}} className="rounded-t-2xl border-t border-valo-line bg-valo-panel">
            <SafeAreaView edges={['bottom']}>
              <View className="flex-row items-center justify-between border-b border-valo-line px-4 py-3">
                <Text className="font-display text-base uppercase tracking-[1px] text-valo-text">Filter scrims</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={() => setFilterVisible(false)}
                  className="h-[44px] w-[44px] items-center justify-center active:opacity-70">
                  <Ionicons name="close" size={22} color={colors.text} />
                </Pressable>
              </View>
              <View className="max-h-[70%] gap-4 p-4">
                {FILTER_GROUPS.map((group) => (
                  <View key={group.label} className="gap-2">
                    <Text className="font-display-semibold text-xs uppercase tracking-[1px] text-valo-muted">{group.label}</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {group.options.map((option) => (
                        <Chip key={option} label={option} />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
