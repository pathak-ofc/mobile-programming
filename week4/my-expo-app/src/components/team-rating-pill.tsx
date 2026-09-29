import { Text, View } from 'react-native';

interface Props {
  rating: number;
  provisional?: boolean;
}

/** Team rating pill. Provisional = muted dashed style. */
export default function TeamRatingPill({ rating, provisional }: Props) {
  return (
    <View
      className={
        provisional
          ? 'flex-row items-baseline gap-1.5 self-start rounded border border-dashed border-valo-muted bg-valo-panel px-2.5 py-1.5'
          : 'flex-row items-baseline gap-1.5 self-start rounded border border-valo-red bg-valo-red/10 px-2.5 py-1.5'
      }>
      <Text
        className={provisional ? 'font-display text-lg text-valo-muted' : 'font-display text-lg text-valo-text'}>
        {rating}
      </Text>
      <Text
        className={
          provisional
            ? 'font-display-semibold text-[10px] tracking-[1.5px] text-valo-muted'
            : 'font-display-semibold text-[10px] tracking-[1.5px] text-valo-red'
        }>
        {provisional ? 'PROVISIONAL' : 'RATING'}
      </Text>
    </View>
  );
}
