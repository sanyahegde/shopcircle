/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FEFCF9',
        sand: {
          100: '#F9F8F6',
          200: '#E8D5C4',
          300: '#D4C5B9',
          400: '#B4A89A',
          500: '#9E9488',
        },
        rose: '#D4A59A',
        charcoal: '#3A3731',
        // Option 1 neutrals for borders/surfaces
        neutral: {
          bg: '#FEFEFE',
          primary: '#E8E4DF',
          secondary: '#C9C5BA',
          accent: '#A8A199',
          cta: '#B5A89D',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
      boxShadow: {
        card: '0px 2px 8px rgba(0,0,0,0.04)',
        'card-hover': '0px 4px 16px rgba(0,0,0,0.06)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
