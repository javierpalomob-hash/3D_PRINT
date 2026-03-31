import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F2137',
        'brand-blue': '#2563EB',
        'blue-light': '#BFDBFE',
        surface: '#F8FAFC',
        muted: '#64748B',
        'body-slate': '#475569',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
