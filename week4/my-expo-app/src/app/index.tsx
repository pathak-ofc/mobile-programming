import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Button from '@/components/button';
import EmptyState from '@/components/empty-state';
import LiveDot from '@/components/live-dot';
import MatchRow from '@/components/match-row';
import NotificationItem from '@/components/notification-item';
import RankBadge from '@/components/rank-badge';
import RosterMemberRow from '@/components/roster-member-row';
import ScrimRequestCard from '@/components/scrim-request-card';
import StatusChip from '@/components/status-chip';
import TeamRatingPill from '@/components/team-rating-pill';
import WLPips from '@/components/wl-pips';
import {
  actionNeeded as seedActions,
  boardPreview,
  chatRooms,
  lfgPosts,
  nextMatch,
  recentMatches,
  roster,
  team,
  user,
} from '@/data/mock';
import { colors } from '@/theme/colors';

function countdownTo(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <View className="h-[3px] w-6 bg-valo-red" />
        <Text className="font-display text-[11px] tracking-[2px] text-valo-red">{kicker}</Text>
      </View>
      <Text className="font-display text-[22px] uppercase text-valo-text">{title}</Text>
      <View className="mt-1">{children}</View>
    </View>
  );
}

/** Flat hard offset shadow, week1 marketing signature (12px block in deep). */
const HARD_SHADOW = 'shadow-[12px_12px_0px_#0A1119]';

export default function HomeScreen() {
  const [actions, setActions] = useState(seedActions);
  // Pure initializer (2h14m before tip-off); synced to the real clock in the effect below.
  const [now, setNow] = useState(nextMatch.startsAt - 8_040_000);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const dismiss = (id: string) => setActions((prev) => prev.filter((a) => a.id !== id));

  return (
    <View className="flex-1 bg-valo-bg">
      <ScrollView contentContainerClassName="gap-6 p-4 pb-12" showsVerticalScrollIndicator={false}>
        {/* Header: brand + bell */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-display text-xl tracking-[2px] text-valo-text">
              VALO <Text className="text-valo-red">ADDA</Text>
            </Text>
            <Text className="mt-0.5 font-display-semibold text-[10px] tracking-[2px] text-valo-muted">
              COMPETITIVE · VERIFIED
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Notifications, ${user.unread} unread`}
            className="h-[44px] w-[44px] items-center justify-center rounded border border-valo-line bg-valo-panel active:opacity-80">
            <Ionicons name="notifications-outline" size={20} color={colors.text} />
            <View className="absolute right-1 top-1 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-valo-red px-1">
              <Text className="font-display text-[10px] text-valo-white">{user.unread}</Text>
            </View>
          </Pressable>
        </View>

        {/* Riot identity + team switcher */}
        <View className={`gap-3 rounded-lg border border-valo-line border-t-4 border-t-valo-red bg-valo-panel p-4 ${HARD_SHADOW}`}>
          <View className="flex-row items-center gap-3">
            <View className="h-[44px] w-[44px] items-center justify-center rounded border border-valo-red bg-valo-deep">
              <Text className="font-display text-sm text-valo-red">RV</Text>
            </View>
            <View className="flex-1 gap-0.5">
              <View className="flex-row items-center gap-1.5">
                <Text className="font-display text-base text-valo-text">{user.riotId}</Text>
                <Ionicons name="shield-checkmark" size={16} color={colors.red} />
              </View>
              <Text className="font-body text-xs text-valo-red">Riot ID verified</Text>
            </View>
            <RankBadge rank={user.rank} />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Switch team, current team ${team.name}`}
            className="min-h-[44px] flex-row items-center justify-between rounded border border-valo-line bg-valo-raised px-4 active:opacity-80">
            <Text className="font-display-semibold text-[13px] tracking-[1px] text-valo-text">
              {team.name}
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.muted} />
          </Pressable>
        </View>

        {/* Quick actions */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button title="Post scrim" accessibilityLabel="Post scrim" />
          </View>
          <View className="flex-1">
            <Button title="Post LFG" variant="ghost" accessibilityLabel="Post LFG" />
          </View>
        </View>

        {/* 1 — Action needed */}
        <Section kicker="// INBOX" title="Action needed">
          {actions.length === 0 ? (
            <EmptyState
              title="All clear. Nothing needs you."
              body="New scrim requests, result checks and invites will land here."
            />
          ) : (
            <View className="gap-3">
              {actions.map((a) => (
                <NotificationItem
                  key={a.id}
                  item={a}
                  onAccept={() => dismiss(a.id)}
                  onDecline={() => dismiss(a.id)}
                />
              ))}
            </View>
          )}
        </Section>

        {/* 2 — Next match */}
        <Section kicker="// UP NEXT" title="Next match">
          <View className={`gap-2 rounded-lg border border-valo-line border-t-4 border-t-valo-red bg-valo-panel p-4 ${HARD_SHADOW}`}>
            <View className="flex-row items-center gap-2">
              <LiveDot color={colors.red} />
              <Text className="font-display-semibold text-[11px] tracking-[1.5px] text-valo-muted">
                COMPETITIVE SCRIM · {nextMatch.format}
              </Text>
            </View>
            <View className="mt-2 flex-row items-center gap-3">
              <View className="flex-1 gap-0.5 border-l-2 border-l-valo-red pl-2">
                <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-dim">YOU</Text>
                <Text className="font-display text-[17px] text-valo-text">{team.name}</Text>
                <Text className="font-display text-sm text-valo-red">{team.rating}</Text>
              </View>
              <Text className="font-display text-sm text-valo-red">VS</Text>
              <View className="flex-1 items-end gap-0.5 border-r-2 border-r-valo-text pr-2">
                <Text className="font-display-semibold text-[10px] tracking-[1.5px] text-valo-dim">
                  OPPONENT
                </Text>
                <Text className="font-display text-[17px] text-valo-text">{nextMatch.opponent}</Text>
                <Text className="font-display text-sm text-valo-red">{nextMatch.opponentRating}</Text>
              </View>
            </View>
            <Text className="mt-2 font-display-semibold text-[13px] text-valo-text">
              {nextMatch.dateLabel} · Starts in {countdownTo(nextMatch.startsAt, now)}
            </Text>
            <Text className="font-body text-xs text-valo-muted">Maps: {nextMatch.maps.join(' · ')}</Text>
            <Text className="font-body text-[11px] text-valo-dim">{nextMatch.server}</Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              <Button title="Chat" variant="ghost" small />
              <Button title="Reschedule" variant="ghost" small />
              <Button title="Cancel" variant="text" small />
            </View>
          </View>
        </Section>

        {/* 3 — My team */}
        <Section kicker="// YOUR FIVE" title="My team">
          <View className={`gap-3 rounded-lg border border-valo-line border-t-4 border-t-valo-red bg-valo-panel p-4 ${HARD_SHADOW}`}>
            <View className="flex-row items-start justify-between gap-3">
              <View>
                <Text className="font-display text-lg text-valo-text">{team.name}</Text>
                <Text className="mt-0.5 font-body text-xs text-valo-muted">
                  Win rate {team.winRate}% · {team.trend}
                </Text>
              </View>
              <TeamRatingPill rating={team.rating} />
            </View>
            <WLPips results={team.lastFive} />
            <View className="mt-2">
              {roster.map((p) => (
                <RosterMemberRow key={p.id} player={p} />
              ))}
            </View>
            <View className="mt-2 flex-row flex-wrap gap-2">
              <Button title="Invite player" variant="ghost" small />
              <Button title="Edit availability" variant="text" small />
            </View>
          </View>
        </Section>

        {/* 4 — Scrim board preview */}
        <Section kicker="// SCRIM BOARD" title="Open requests near you">
          <View className="gap-3">
            {boardPreview.map((b) => (
              <ScrimRequestCard key={b.id} item={b} />
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View full scrim board"
            className="mt-3 min-h-[44px] justify-center active:opacity-80">
            <Text className="font-display text-xs tracking-[1.5px] text-valo-red">VIEW FULL BOARD →</Text>
          </Pressable>
        </Section>

        {/* 5 — Recent matches */}
        <Section kicker="// HISTORY" title="Recent matches">
          <View className="gap-3">
            {recentMatches.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </View>
        </Section>

        {/* 6 — Community */}
        <Section kicker="// COMMUNITY" title="Players looking now">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
            {lfgPosts.map((p) => (
              <View
                key={p.id}
                className="mr-3 w-[220px] gap-1 rounded-lg border border-valo-line border-l-4 border-l-valo-red bg-valo-panel p-4">
                <Text className="font-display text-sm text-valo-text">{p.riotId}</Text>
                <Text className="font-body text-[11px] text-valo-muted">
                  {p.rank} · {p.role}
                </Text>
                <Text className="font-body text-xs text-valo-text">{p.note}</Text>
                <Text className="font-body text-[11px] text-valo-dim">
                  {p.region} · {p.mic ? 'Mic yes' : 'No mic'} · {p.availability}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View className="gap-3">
            {chatRooms.map((c) => (
              <View
                key={c.id}
                className="min-h-[56px] flex-row items-center gap-3 rounded-lg border border-valo-line bg-valo-panel p-4">
                <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.red} />
                <Text className="flex-1 font-display-semibold text-[13px] text-valo-text">{c.name}</Text>
                <Text className="font-body text-[11px] text-valo-muted">
                  {c.members} · {c.unread > 0 ? `${c.unread} new` : 'caught up'}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* 7 — Account and trust */}
        <Section kicker="// TRUST" title="Account and trust">
          <View className="gap-3 rounded-lg border border-valo-line border-l-4 border-l-valo-red bg-valo-panel p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-display-semibold text-xs tracking-[1px] text-valo-muted">Reputation</Text>
              <Text className="font-display text-base text-valo-red">{team.reputation}/100</Text>
            </View>
            <View className="h-1 overflow-hidden rounded-full bg-valo-deep">
              <View className="h-full w-[96%] bg-valo-red" />
            </View>
            <Text className="font-body text-xs text-valo-muted">Rank last synced {team.rankSynced}.</Text>
            <View className="flex-row items-start gap-3">
              <StatusChip status="confirmed" />
              <Text className="flex-1 font-body text-xs leading-[18px] text-valo-muted">
                Your Riot rank and match data is visible to other players so teams can trust the
                matchup. Change this in settings anytime.
              </Text>
            </View>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
}
