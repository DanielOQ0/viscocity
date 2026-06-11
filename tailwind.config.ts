import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Los productos del American Fest traen su gradiente (bg_color) desde
  // Directus como clases from-*/to-*, que el JIT no puede ver en el código.
  safelist: [
    {
      pattern:
        /^(from|via|to)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(300|400|500|600|700|800)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#fdc738',
          orange: '#E7971c',
          purple: '#261536',
          'purple-mid': '#3a2356',
        },
        af: {
          dark: '#0e0816',
          card: '#1a1026',
          fire: '#ff4d2e',
          blue: '#4f7df9',
        },
      },
      fontFamily: {
        milker: ['Milker', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #fdc738, #E7971c)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
