/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEF9',
          100: '#FAF8F3',
          200: '#E4DFD7',
          300: '#C9C3BA',
          400: '#B8AFA4',
          500: '#8B7E74',
        },
        warm: {
          black: '#2B2825',
          gray: '#7A7671',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontWeight: {
        light: '300',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
      },
      transitionDuration: {
        300: '300ms',
        400: '400ms',
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
