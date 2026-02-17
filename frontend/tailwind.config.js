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
        espresso: '#3D342A',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
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
        'receipt-in': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(100vh) rotate(-2deg)', opacity: '0' },
          '8%': { opacity: '0.06' },
          '92%': { opacity: '0.06' },
          '100%': { transform: 'translateY(-20vh) rotate(1deg)', opacity: '0' },
        },
        'dots-bounce': {
          '0%, 100%': { backgroundPosition: '0 0' },
          '50%': { backgroundPosition: '24px 18px' },
        },
        'dot-wander-a': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(18px, 10px)' },
          '50%': { transform: 'translate(-12px, 14px)' },
          '75%': { transform: 'translate(6px, -8px)' },
        },
        'dot-wander-b': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-14px, -8px)' },
          '50%': { transform: 'translate(10px, 12px)' },
          '75%': { transform: 'translate(-6px, 6px)' },
        },
        'dot-wander-c': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(8px, -12px)' },
          '50%': { transform: 'translate(-16px, 4px)' },
          '75%': { transform: 'translate(12px, 10px)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'receipt-in': 'receipt-in 0.7s ease-out forwards',
        'spin-slow': 'spin-slow 8s linear infinite',
        'float-up': 'float-up 25s linear infinite',
        'dots-bounce': 'dots-bounce 6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
        'dot-wander-a': 'dot-wander-a 14s ease-in-out infinite',
        'dot-wander-b': 'dot-wander-b 18s ease-in-out infinite',
        'dot-wander-c': 'dot-wander-c 16s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
}
