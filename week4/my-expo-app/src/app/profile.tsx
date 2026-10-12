import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/avatar';
import Button from '@/components/button';
import Card from '@/components/card';
import Chip from '@/components/chip';
import RankBadge from '@/components/rank-badge';

// ---- Mock data --------------------------------------------------------------

const profile = {
  riotId: 'RAVEN#052',
  rank: 'Immortal 3',
  region: 'South Asia',
  team: 'FRAGILE FIVE',
  roles: ['Duelist', 'Flex'],
  topAgents: ['Reyna', 'Jett', 'Raze'],
  availabilityDays: ['M', 'T', 'W', 'Th', 'F'],
  availabilitySlot: 'Evenings',
  stats: { matches: 86, winRate: 68, kd: 1.34 },
  badges: ['Verified Riot ID', 'Team captain', '50 win streak club'],
};

const ALL_DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="min-h-[56px] flex-row items-center justify-between border-b border-valo-line bg-valo-bg px-4">
          <Text className="font-display text-xl tracking-[2px] text-valo-text">PROFILE</Text>
        </View>

        <View className="flex-1 gap-5 p-4">
          <Card className="items-center gap-3">
            <Avatar initials={profile.riotId.slice(0, 2)} size="large" />
            <View className="items-center gap-1">
              <Text className="font-display text-lg text-valo-text">{profile.riotId}</Text>
              <View className="flex-row items-center gap-2">
                <RankBadge rank={profile.rank} />
                <Text className="font-body text-xs text-valo-muted">{profile.region}</Text>
              </View>
              <Text className="font-body text-xs text-valo-muted">{profile.team}</Text>
            </View>
            <Button title="Edit" variant="ghost" small accessibilityLabel="Edit profile" />
          </Card>

          <View className="gap-2">
            <Text className="font-display text-base uppercase tracking-[0.5px] text-valo-text">Roles</Text>
            <View className="flex-row flex-wrap gap-2">
              {profile.roles.map((role) => (
                <Chip key={role} label={role} selected />
              ))}
            </View>
            <Text className="mt-1 font-display text-base uppercase tracking-[0.5px] text-valo-text">Top agents</Text>
            <View className="flex-row flex-wrap gap-2">
              {profile.topAgents.map((agent) => (
                <Chip key={agent} label={agent} />
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-base uppercase tracking-[0.5px] text-valo-text">Availability</Text>
            <View className="flex-row gap-1.5">
              {ALL_DAYS.map((day) => {
                const active = profile.availabilityDays.includes(day);
                return (
                  <View
                    key={day}
                    className={`h-8 w-8 items-center justify-center rounded-full border ${active ? 'border-valo-accent bg-valo-accent/10' : 'border-valo-line bg-valo-panel'}`}>
                    <Text className={`font-display-semibold text-[11px] ${active ? 'text-valo-accent' : 'text-valo-muted'}`}>{day}</Text>
                  </View>
                );
              })}
            </View>
            <Text className="font-body text-xs text-valo-muted">{profile.availabilitySlot}</Text>
          </View>

          <Card className="flex-row justify-between">
            <View className="items-center gap-1">
              <Text className="font-display text-lg text-valo-text">{profile.stats.matches}</Text>
              <Text className="font-body text-[11px] text-valo-muted">Matches</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="font-display text-lg text-valo-accent">{profile.stats.winRate}%</Text>
              <Text className="font-body text-[11px] text-valo-muted">Win rate</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="font-display text-lg text-valo-text">{profile.stats.kd}</Text>
              <Text className="font-body text-[11px] text-valo-muted">K/D</Text>
            </View>
          </Card>

          <View className="gap-2">
            <Text className="font-display text-base uppercase tracking-[0.5px] text-valo-text">Badges</Text>
            <View className="flex-row flex-wrap gap-2">
              {profile.badges.map((badge) => (
                <Chip key={badge} label={badge} />
              ))}
            </View>
          </View>

          <Text className="text-center font-body text-[11px] leading-[16px] text-valo-dim">
            Valo Adda is a fan project and isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or
            opinions of Riot Games or anyone officially involved in producing or managing VALORANT. VALORANT and
            Riot Games are trademarks or registered trademarks of Riot Games, Inc.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
