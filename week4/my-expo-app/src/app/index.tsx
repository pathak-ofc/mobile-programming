import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/avatar';
import Button from '@/components/button';
import Card from '@/components/card';
import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import RankBadge from '@/components/rank-badge';
import { colors } from '@/theme/colors';

// ---- Mock data (UI only, nothing persists) --------------------------------

const user = {
  riotId: 'RAVEN#052',
  rank: 'Immortal 3',
  unread: 3,
};

const team = {
  name: 'FRAGILE FIVE',
  rating: 1842,
  winRate: 68,
  trend: '+36 this week',
  lastFive: ['W', 'W', 'L', 'W', 'W'] as const,
};

const nextMatch = {
  opponent: 'RE//ACT',
  opponentRating: 1817,
  dateLabel: 'Tonight · 8:30 PM',
  maps: ['Ascent', 'Lotus', 'Sunset'],
  format: '5v5 · BO3',
  server: 'Mumbai · 28ms',
};

const actionNeeded = [
  { id: 'a1', title: 'Scrim request from RE//ACT', detail: 'Immortal 2 · Tonight 8:30 PM · BO3', time: '12m ago' },
  { id: 'a2', title: 'Confirm result vs NOVA//5', detail: 'You reported 13–9. Waiting on your tap to lock +24.', time: '1h ago' },
];

const recentMatches = [
  { id: 'm1', opponent: 'NOVA//5', score: '13–9', delta: 24, map: 'Lotus' },
  { id: 'm2', opponent: 'LOWKEY//GG', score: '13–7', delta: 18, map: 'Sunset' },
];

// ---- Small local pieces ----------------------------------------------------

function Section({ title, onArrowPress, children }: { title: string; onArrowPress?: () => void; children: ReactNode }) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="font-display text-lg uppercase tracking-[0.5px] text-valo-text">{title}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View all, ${title}`}
          onPress={onArrowPress}
          className="h-[36px] w-[36px] items-center justify-center active:opacity-70">
          <Ionicons name="arrow-forward" size={18} color={colors.muted} />
        </Pressable>
      </View>
      <View>{children}</View>
    </View>
  );
}

export default function HomeScreen() {
  const [hasTeam] = useState(true);
  const [actions, setActions] = useState(actionNeeded);

  const dismiss = (id: string) => setActions((prev) => prev.filter((a) => a.id !== id));

  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header title="Valo Adda" unreadCount={user.unread} />
        <ScrollView contentContainerClassName="gap-6 p-4 pb-12" showsVerticalScrollIndicator={false}>
          {/* Profile box */}
          <Card className="flex-row items-center gap-3">
            <Avatar initials="RV" size="medium" />
            <View className="flex-1 gap-0.5">
              <Text className="font-display text-base text-valo-text">{user.riotId}</Text>
              <Text className="font-body text-xs text-valo-muted">{hasTeam ? team.name : 'No team yet'}</Text>
            </View>
            <RankBadge rank={user.rank} />
          </Card>

          {/* Quick actions */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button title="Post scrim" accessibilityLabel="Post scrim" />
            </View>
            <View className="flex-1">
              <Button title="LFG" variant="ghost" accessibilityLabel="LFG" onPress={() => router.push('/lfg')} />
            </View>
          </View>

          {/* Action needed */}
          <Section title="Action needed">
            {actions.length === 0 ? (
              <EmptyState title="All clear. Nothing needs you." body="New scrim requests and result checks will land here." />
            ) : (
              <View className="gap-3">
                {actions.map((a) => (
                  <View key={a.id} className="gap-2 rounded-lg border border-valo-line border-l-4 border-l-valo-danger bg-valo-panel p-4">
                    <Text className="font-display-semibold text-sm text-valo-text">{a.title}</Text>
                    <Text className="font-body text-[13px] leading-[19px] text-valo-muted">{a.detail}</Text>
                    <View className="mt-1 flex-row items-center justify-between">
                      <Text className="font-body text-[11px] text-valo-dim">{a.time}</Text>
                      <View className="flex-row gap-2">
                        <Button title="Decline" variant="ghost" small onPress={() => dismiss(a.id)} accessibilityLabel={`Decline ${a.title}`} />
                        <Button title="Accept" small onPress={() => dismiss(a.id)} accessibilityLabel={`Accept ${a.title}`} />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Section>

          {/* Next match */}
          <Section title="Next match">
            <Card featured className="gap-2">
              <Text className="font-display-semibold text-[11px] tracking-[1.5px] text-valo-muted">
                COMPETITIVE SCRIM · {nextMatch.format}
              </Text>
              <View className="mt-2 flex-row items-center gap-3">
                <View className="flex-1 gap-0.5 border-l-2 border-l-valo-accent pl-2">
                  <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-dim">YOU</Text>
                  <Text className="font-display text-[17px] text-valo-text">{team.name}</Text>
                  <Text className="font-display text-sm text-valo-accent">{team.rating}</Text>
                </View>
                <Text className="font-display text-sm text-valo-accent">VS</Text>
                <View className="flex-1 items-end gap-0.5 border-r-2 border-r-valo-text pr-2">
                  <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-dim">OPPONENT</Text>
                  <Text className="font-display text-[17px] text-valo-text">{nextMatch.opponent}</Text>
                  <Text className="font-display text-sm text-valo-accent">{nextMatch.opponentRating}</Text>
                </View>
              </View>
              <Text className="mt-2 font-display-semibold text-[13px] text-valo-text">{nextMatch.dateLabel}</Text>
              <Text className="font-body text-xs text-valo-muted">Maps: {nextMatch.maps.join(' · ')}</Text>
              <Text className="font-body text-[11px] text-valo-dim">{nextMatch.server}</Text>
            </Card>
          </Section>

          {/* My team */}
          <Section title="My team" onArrowPress={() => router.push('/team')}>
            {hasTeam ? (
              <Card className="gap-3">
                <View className="flex-row items-start justify-between gap-3">
                  <View>
                    <Text className="font-display text-lg text-valo-text">{team.name}</Text>
                    <Text className="mt-0.5 font-body text-xs text-valo-muted">
                      Win rate {team.winRate}% · {team.trend}
                    </Text>
                  </View>
                  <View className="flex-row items-baseline gap-1.5 self-start rounded border border-valo-accent bg-valo-accent/10 px-2.5 py-1.5">
                    <Text className="font-display text-lg text-valo-text">{team.rating}</Text>
                    <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-accent">RATING</Text>
                  </View>
                </View>
                <View className="flex-row gap-1.5">
                  {team.lastFive.map((r, i) => (
                    <View
                      key={i}
                      className={`h-7 w-7 items-center justify-center rounded border ${r === 'W' ? 'border-valo-text bg-valo-text/10' : 'border-valo-danger bg-valo-danger/10'}`}>
                      <Text className={`font-display text-xs ${r === 'W' ? 'text-valo-text' : 'text-valo-danger'}`}>{r}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ) : (
              <EmptyState title="You're not on a team yet" body="Create a team or find one in LFG to see your roster here." />
            )}
          </Section>

          {/* Recent matches */}
          <Section title="Recent matches" onArrowPress={() => router.push('/scrims')}>
            <View className="gap-3">
              {recentMatches.map((m) => (
                <View key={m.id} className="flex-row items-center justify-between rounded-lg border border-valo-line bg-valo-panel p-4">
                  <View className="flex-1 gap-0.5">
                    <Text className="font-display text-[15px] text-valo-text">{m.opponent}</Text>
                    <Text className="font-body text-xs text-valo-muted">{m.map} · {m.score}</Text>
                  </View>
                  <Text className="font-display text-[15px] text-valo-accent">+{m.delta}</Text>
                </View>
              ))}
            </View>
          </Section>

          <View className="px-1 py-4">
            <Text className="text-center font-body text-[11px] leading-[16px] text-valo-dim">
              Valo Adda is a fan project and isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or
              opinions of Riot Games or anyone officially involved in producing or managing VALORANT. VALORANT and
              Riot Games are trademarks or registered trademarks of Riot Games, Inc.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
