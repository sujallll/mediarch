/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00FFC2',
        secondary: '#1E1B4B',
        accent: '#6366F1',
        background: '#0F0F1A',
        foreground: '#FFFFFF',
      },
      animation: {
        'wave-pulse': 'wave-pulse 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'grid-flow': 'grid-flow 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient 8s linear infinite',
        'gradient-reverse': 'gradient 8s linear infinite reverse',
      },
      keyframes: {
        'wave-pulse': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 30px rgba(255, 0, 0, 0.6)' },
          '100%': { 'box-shadow': '0 0 60px rgba(255, 0, 0, 0.8)' },
        },
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(transparent 97%, rgba(255, 0, 0, 0.3) 97%), linear-gradient(90deg, transparent 97%, rgba(255, 0, 0, 0.3) 97%)',
      },
      backgroundSize: {
        '200%': '200% auto',
      },
    },
  },
  plugins: [],
}