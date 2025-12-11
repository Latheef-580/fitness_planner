/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'SF Pro Text', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        slateDark: {
          900: '#020617',
          800: '#0b1120',
          700: '#1e293b',
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.15)',
      }
    },
  },
  plugins: [],
}
