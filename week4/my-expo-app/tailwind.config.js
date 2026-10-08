/** Valo Adda design system for Tailwind/NativeWind.
 *  Mirrors week1/styles.css tokens: Valorant black + red, flat, cream text.
 *  Raw hexes needed as props (Ionicons `color`) live in src/theme/colors.ts.
 *  @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        valo: {
          bg: '#0F1923',
          deep: '#0A1119',
          panel: '#16232F',
          raised: '#1C2B38',
          line: 'rgba(236, 232, 225, 0.14)',
          text: '#ECE8E1',
          white: '#F7F5F0',
          muted: '#9DA6AD',
          dim: '#697680',
          ink: '#0F1923',
          red: '#FF4655',
          reddark: '#C73240',
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
