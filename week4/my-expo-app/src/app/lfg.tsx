import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/avatar';
import Button from '@/components/button';
import Chip from '@/components/chip';
import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import RankBadge from '@/components/rank-badge';
import { colors } from '@/theme/colors';

// ---- Mock data --------------------------------------------------------------

interface LfgPlayer {
  id: string;
  riotId: string;
  rank: string;
  role: string;
  topAgents: string[];
  availability: string;
}

const lfgPlayers: LfgPlayer[] = [
  { id: 'lp1', riotId: 'AXIOM#921', rank: 'Ascendant 2', role: 'Controller', topAgents: ['Omen', 'Astra', 'Harbor'], availability: 'Evenings' },
  { id: 'lp2', riotId: 'NYX#404', rank: 'Immortal 1', role: 'Initiator', topAgents: ['Sova', 'Fade', 'Skye'], availability: 'Now' },
  { id: 'lp3', riotId: 'KAI#110', rank: 'Ascendant 3', role: 'Duelist', topAgents: ['Reyna', 'Jett', 'Raze'], availability: 'Weekends' },
];

interface LfgTeamPost {
  id: string;
  teamName: string;
  teamTag: string;
  avgRank: string;
  playersNeeded: number;
  rolesNeeded: string[];
  region: string;
}

const lfgTeams: LfgTeamPost[] = [
  { id: 'lt1', teamName: 'ECHO//FIVE', teamTag: 'EC5', avgRank: 'Ascendant 2', playersNeeded: 1, rolesNeeded: ['Sentinel'], region: 'South Asia' },
  { id: 'lt2', teamName: 'VANTA//BLACK', teamTag: 'VTB', avgRank: 'Ascendant 3', playersNeeded: 2, rolesNeeded: ['Controller', 'Initiator'], region: 'South Asia' },
];

const TOGGLE_OPTIONS = ['Players', 'Teams'];
const FILTER_CHIPS = ['Duelist', 'Controller', 'Initiator', 'Sentinel', 'Diamond', 'Ascendant', 'Immortal', 'Now', 'Evenings'];

// ---- Small local pieces (only used on this screen) -------------------------

function LfgToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="LFG list filter" className="flex-row rounded-lg border border-valo-line bg-valo-panel p-1">
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

function PostLfgFab() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Post LFG"
      className="absolute bottom-24 right-5 h-[56px] w-[56px] items-center justify-center rounded-full border border-valo-accent bg-valo-accent shadow-lg shadow-valo-accent/30 active:opacity-80">
      <Ionicons name="add" size={28} color={colors.white} />
    </Pressable>
  );
}

export default function LfgScreen() {
  const [toggle, setToggle] = useState('Players');
  const [invited, setInvited] = useState<Record<string, boolean>>({});

  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header title="LFG" />
        <View className="gap-3 p-4">
          <LfgToggle value={toggle} onChange={setToggle} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {FILTER_CHIPS.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </ScrollView>
        </View>

        {toggle === 'Players' ? (
          <FlatList
            data={lfgPlayers}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3 px-4 pb-36"
            renderItem={({ item }) => (
              <View className="flex-row items-center gap-3 rounded-lg border border-valo-line bg-valo-panel p-4">
                <Avatar initials={item.riotId.slice(0, 2)} />
                <View className="flex-1 gap-1">
                  <Text className="font-display text-[15px] text-valo-text">{item.riotId}</Text>
                  <View className="flex-row items-center gap-2">
                    <RankBadge rank={item.rank} />
                    <Text className="font-body text-xs text-valo-muted">{item.role}</Text>
                  </View>
                  <Text className="font-body text-[11px] text-valo-dim">{item.topAgents.join(' · ')} · {item.availability}</Text>
                </View>
                <Button
                  title={invited[item.id] ? 'Invited' : 'Invite'}
                  small
                  variant={invited[item.id] ? 'ghost' : 'primary'}
                  disabled={invited[item.id]}
                  onPress={() => setInvited((prev) => ({ ...prev, [item.id]: true }))}
                  accessibilityLabel={`${invited[item.id] ? 'Invited' : 'Invite'} ${item.riotId}`}
                />
              </View>
            )}
            ListEmptyComponent={<EmptyState title="No players looking right now" body="Check back soon or post your own LFG request." />}
          />
        ) : (
          <FlatList
            data={lfgTeams}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3 px-4 pb-36"
            renderItem={({ item }) => (
              <View className="flex-row items-center gap-3 rounded-lg border border-valo-line bg-valo-panel p-4">
                <Avatar initials={item.teamTag} />
                <View className="flex-1 gap-1">
                  <Text className="font-display text-[15px] text-valo-text">{item.teamName}</Text>
                  <Text className="font-body text-xs text-valo-muted">
                    {item.avgRank} · Needs {item.playersNeeded} · {item.rolesNeeded.join(', ')}
                  </Text>
                  <Text className="font-body text-[11px] text-valo-dim">{item.region}</Text>
                </View>
                <Button title="Request to join" small accessibilityLabel={`Request to join ${item.teamName}`} />
              </View>
            )}
            ListEmptyComponent={<EmptyState title="No teams recruiting right now" body="Check back soon or post your own LFG request." />}
          />
        )}

        <PostLfgFab />
      </SafeAreaView>
    </View>
  );
}
