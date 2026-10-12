/** Valo Adda design system for Tailwind/NativeWind.
 *  Valorant-style theme: black/grey base, red accent.
 *  Raw hexes needed as props (Ionicons `color`, etc) live in src/theme/colors.ts.
 *  @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        valo: {
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
          red: '#FF4655',
          reddark: '#C9344D',
        },
      },
      fontFamily: {
        display: ['ChakraPetch_700Bold'],
        'display-semibold': ['ChakraPetch_600SemiBold'],
        'display-medium': ['ChakraPetch_500Medium'],
        body: ['Inter_400Regular'],
        'body-medium': ['Inter_500Medium'],
        'body-semibold': ['Inter_600SemiBold'],
        'body-bold': ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
};
