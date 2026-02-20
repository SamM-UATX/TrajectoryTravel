import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet)', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#FDFBF7',
        'cream-dark': '#F5F0E8',
        navy: '#1E3A5F',
        'navy-light': '#2C5282',
        'navy-dark': '#0F2744',
        'accent-gold': '#C9A227',
        'accent-teal': '#2D6A6A',
        white: '#FFFFFF',
        'cloud-gray': '#E8E4DE',
        'cloud-gray-dark': '#D4CFC6',
        ink: '#1a1a2e',
        // New palette: light gray, green, cool accent
        sage: '#8B9A7B',
        'sage-light': '#A8B89A',
        'sage-dark': '#6B7B5C',
        mint: '#B8D4C8',
        'mint-light': '#D4E8E0',
        'slate-gray': '#6B7B7B',
        'ocean-breeze': '#7BA3B8',
        // Legacy aliases for gradual migration
        'sky-blue': '#1E3A5F',
        'sky-blue-light': '#2C5282',
        'sky-blue-dark': '#0F2744',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
