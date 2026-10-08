import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, View } from 'react-native';

import { colors } from '@/theme/colors';

/** Pulsing live dot. Disabled when OS reduce-motion is on. */
export default function LiveDot({ color = colors.red }: { color?: string }) {
  const [scale] = useState(() => new Animated.Value(1));
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (!mounted || reduced) return;
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scale, { toValue: 1.6, duration: 900, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.4, duration: 900, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
          ]),
        ]),
      ).start();
    });
    return () => {
      mounted = false;
    };
  }, [opacity, scale]);

  return (
    <View className="h-3 w-3 items-center justify-center">
      {/* Animated values can't be expressed as classes — static sizing stays in className. */}
      <Animated.View
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color, transform: [{ scale }], opacity }}
      />
    </View>
  );
}
