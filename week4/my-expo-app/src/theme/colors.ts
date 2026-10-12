/**
 * Raw palette for props Tailwind classes can't reach (Ionicons `color`, etc).
 * Keep these values in sync with tailwind.config.js.
 * Valorant-style theme: black/grey base with red accent.
 */
export const colors = {
  bg: '#0F1923',
  deep: '#0A0E13',
  panel: '#161F2B',
  raised: '#1E2A38',
  line: '#2B3744',
  text: '#ECE8E1',
  white: '#FFFFFF',
  muted: '#8B97A3',
  dim: '#5C6773',
  ink: '#0F1923',
  accent: '#FF4655',
  danger: '#C9344D',
  violet: '#7C5CFF',
  // Legacy aliases keep older components compiling.
  red: '#FF4655',
  redDark: '#C9344D',
} as const;
