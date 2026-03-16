/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#09090b', // zinc-950
          800: '#18181b', // zinc-900
          700: '#27272a', // zinc-800
        },
        neon: {
          purple: '#b026ff',
          pink: '#ff1493',
          blue: '#00d2ff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(176, 38, 255, 0.6))' },
          '50%': { opacity: '.8', filter: 'drop-shadow(0 0 2px rgba(176, 38, 255, 0.4))' },
        }
      }
    },
  },
  plugins: [],
}
