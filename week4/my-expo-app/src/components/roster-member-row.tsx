import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import RankBadge from '@/components/rank-badge';
import type { RosterPlayer } from '@/data/mock';
import { colors } from '@/theme/colors';

/** Roster row: Riot ID, rank badge, role, captain star, online dot. */
export default function RosterMemberRow({ player }: { player: RosterPlayer }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-valo-line py-3">
      <View className={player.online ? 'h-2 w-2 rounded-full bg-valo-red' : 'h-2 w-2 rounded-full bg-valo-dim'} />
      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center gap-1.5">
          <Text className="font-display-semibold text-sm text-valo-text">{player.riotId}</Text>
          {player.isCaptain ? <Ionicons name="star" size={12} color={colors.text} /> : null}
        </View>
        <Text className="font-body text-xs text-valo-muted">{player.role}</Text>
      </View>
      <RankBadge rank={player.rank} />
    </View>
  );
}
