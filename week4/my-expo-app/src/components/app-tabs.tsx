import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { colors } from '@/theme/colors';

/** The main navigation is intentionally limited to the five wireframe tabs. */
export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={colors.panel}
      tintColor={colors.accent}
      labelStyle={{
        selected: { color: colors.accent },
        default: { color: colors.muted },
      }}
      indicatorColor={colors.accent}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="scrims">
        <NativeTabs.Trigger.Label>Scrims</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'rectangle.3.group', selected: 'rectangle.3.group.fill' }}
          md="sports_esports"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="lfg">
        <NativeTabs.Trigger.Label>LFG</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person.2', selected: 'person.2.fill' }} md="group" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="team">
        <NativeTabs.Trigger.Label>Team</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person.3', selected: 'person.3.fill' }} md="groups" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person', selected: 'person.fill' }} md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
