import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/avatar';
import Button from '@/components/button';
import Card from '@/components/card';
import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import RankBadge from '@/components/rank-badge';
import { colors } from '@/theme/colors';

// ---- Mock data --------------------------------------------------------------

const team = {
  name: 'FRAGILE FIVE',
  tag: 'FF',
  rating: 1842,
};

interface RosterPlayer {
  id: string;
  riotId: string;
  rank: string;
  role: string;
  isCaptain: boolean;
}

const roster: RosterPlayer[] = [
  { id: 'p1', riotId: 'RAVEN#052', rank: 'Immortal 3', role: 'Duelist', isCaptain: true },
  { id: 'p2', riotId: 'AXIOM#921', rank: 'Immortal 2', role: 'Controller', isCaptain: false },
  { id: 'p3', riotId: 'NYX#404', rank: 'Immortal 1', role: 'Initiator', isCaptain: false },
  { id: 'p4', riotId: 'KAI#110', rank: 'Ascendant 3', role: 'Sentinel', isCaptain: false },
];

const upcomingScrims = [
  { id: 'us1', opponent: 'RE//ACT', dateLabel: 'Tonight · 8:30 PM', format: 'Bo3' },
  { id: 'us2', opponent: 'ECHO//FIVE', dateLabel: 'Fri · 9:00 PM', format: 'Bo1' },
];

const teamStats = { matchesPlayed: 42, winRate: 68, avgRoundDiff: '+2.4' };

const IS_CAPTAIN = true; // Mock-only: the signed-in user is the captain in the roster data.

export default function TeamScreen() {
  const [hasTeam] = useState(true);

  if (!hasTeam) {
    return (
      <View className="flex-1 bg-valo-bg">
        <SafeAreaView edges={['top']} className="flex-1">
          <Header title="Team" />
          <View className="flex-1 justify-center p-4">
            <EmptyState title="You're not on a team yet" body="Create a team to start scrims, or find one in LFG." />
            <View className="mt-4 gap-3">
              <Button title="Create team" accessibilityLabel="Create team" />
              <Button title="Find a team in LFG" variant="text" accessibilityLabel="Find a team in LFG" />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const openSlots = Math.max(0, 5 - roster.length);

  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header title="Team" />
        <ScrollView contentContainerClassName="gap-5 p-4 pb-12" showsVerticalScrollIndicator={false}>
          <Card className="gap-3">
            <View className="flex-row items-start gap-3">
              <Avatar initials={team.tag} size="large" />
              <View className="flex-1 gap-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-display text-lg text-valo-text">
                    {team.name} <Text className="text-valo-muted">[{team.tag}]</Text>
                  </Text>
                  {IS_CAPTAIN ? <Button title="Edit" variant="text" small accessibilityLabel="Edit team" /> : null}
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="flex-row items-baseline gap-1.5 self-start rounded border border-valo-accent bg-valo-accent/10 px-2.5 py-1.5">
                    <Text className="font-display text-lg text-valo-text">{team.rating}</Text>
                    <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-accent">RATING</Text>
                  </View>
                  <Text className="font-body text-xs text-valo-muted">{roster.length}/5 players</Text>
                </View>
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <Button title="Post scrim" small accessibilityLabel="Post scrim" />
              {IS_CAPTAIN ? <Button title="Manage" variant="ghost" small accessibilityLabel="Manage team" /> : null}
            </View>
          </Card>

          <View className="gap-2">
            <Text className="font-display text-lg uppercase tracking-[0.5px] text-valo-text">Roster</Text>
            <Card className="gap-0">
              {roster.map((p, i) => (
                <View
                  key={p.id}
                  className={`min-h-[64px] flex-row items-center gap-3 py-3 ${i < roster.length - 1 || openSlots > 0 ? 'border-b border-valo-line' : ''}`}>
                  <View className="flex-1 gap-0.5">
                    <View className="flex-row items-center gap-1.5">
                      <Text className="font-display-semibold text-sm text-valo-text">{p.riotId}</Text>
                      {p.isCaptain ? <Ionicons name="star" size={12} color={colors.text} /> : null}
                    </View>
                    <Text className="font-body text-xs text-valo-muted">{p.role}</Text>
                  </View>
                  <RankBadge rank={p.rank} />
                </View>
              ))}
              {Array.from({ length: openSlots }).map((_, i) => (
                <Pressable
                  key={`slot-${i}`}
                  accessibilityRole="button"
                  accessibilityLabel="Invite player to open slot"
                  className={`min-h-[64px] flex-row items-center justify-center gap-2 py-3 active:opacity-70 ${i < openSlots - 1 ? 'border-b border-dashed border-valo-line' : ''}`}>
                  <Ionicons name="add-circle-outline" size={18} color={colors.muted} />
                  <Text className="font-body-medium text-sm text-valo-muted">Invite player</Text>
                </Pressable>
              ))}
            </Card>
          </View>

          <View className="gap-2">
            <Text className="font-display text-lg uppercase tracking-[0.5px] text-valo-text">Upcoming scrims</Text>
            <View className="gap-3">
              {upcomingScrims.map((s) => (
                <Card key={s.id} className="flex-row items-center justify-between">
                  <View>
                    <Text className="font-display-semibold text-sm text-valo-text">vs {s.opponent}</Text>
                    <Text className="font-body text-xs text-valo-muted">{s.dateLabel} · {s.format}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.muted} />
                </Card>
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-lg uppercase tracking-[0.5px] text-valo-text">Team stats</Text>
            <Card className="flex-row justify-between">
              <View className="items-center gap-1">
                <Text className="font-display text-lg text-valo-text">{teamStats.matchesPlayed}</Text>
                <Text className="font-body text-[11px] text-valo-muted">Matches</Text>
              </View>
              <View className="items-center gap-1">
                <Text className="font-display text-lg text-valo-accent">{teamStats.winRate}%</Text>
                <Text className="font-body text-[11px] text-valo-muted">Win rate</Text>
              </View>
              <View className="items-center gap-1">
                <Text className="font-display text-lg text-valo-text">{teamStats.avgRoundDiff}</Text>
                <Text className="font-body text-[11px] text-valo-muted">Avg round diff</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
