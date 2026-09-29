import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { colors } from '@/theme/colors';

/**
 * Bottom tab bar: Home, Scrims, Team, Chat, Profile.
 * Deep panel, Valorant red active state. SF Symbols on iOS, Material symbols on Android.
 */
export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={colors.deep}
      tintColor={colors.red}
      labelStyle={{
        selected: { color: colors.red },
        default: { color: colors.muted },
      }}
      indicatorColor={colors.red}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="scrims">
        <NativeTabs.Trigger.Label>Scrims</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'trophy', selected: 'trophy.fill' }}
          md="sports_esports"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="team">
        <NativeTabs.Trigger.Label>Team</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.3', selected: 'person.3.fill' }}
          md="group"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="chat">
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Badge>3</NativeTabs.Trigger.Badge>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'message', selected: 'message.fill' }}
          md="chat"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          md="person"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
