import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <View className="flex-1 bg-valo-bg">
      <SafeAreaView className="flex-1 p-6">
        <Text className="mb-2 font-display-semibold text-[11px] tracking-[2px] text-valo-red">
          VALO ADDA
        </Text>
        <Text className="mb-2 font-display text-2xl text-valo-text">{title}</Text>
        <Text className="font-body text-sm leading-[21px] text-valo-muted">{body}</Text>
      </SafeAreaView>
    </View>
  );
}

export default Placeholder;
