/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#22252F',          // primary text
        indigo: {
          DEFAULT: '#1B1F3B',    // header / nav
          light: '#2A2F55',
          dark: '#12142B',
        },
        marigold: {
          DEFAULT: '#FF9F1C',    // primary CTA / accent
          dark: '#E8890A',
          light: '#FFB65C',
        },
        leaf: {
          DEFAULT: '#16794F',    // price / in-stock
          light: '#E6F4EC',
        },
        deal: {
          DEFAULT: '#E1483A',    // discount badges
          light: '#FDEAE8',
        },
        paper: '#FAFAF8',        // page background
        line: '#E7E5DF',         // hairline borders
      },
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27, 31, 59, 0.06), 0 1px 1px rgba(27, 31, 59, 0.04)',
        popover: '0 12px 28px rgba(27, 31, 59, 0.16)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};
