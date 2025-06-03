import type {Config} from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: { 
      center: true,
      padding: {
        DEFAULT: '1rem', 
        sm: '1rem', 
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'Manrope', 'sans-serif'], 
        headline: ['var(--font-inter)', 'Manrope', 'sans-serif'],
        code: ['monospace'],
        // Satoshi would be defined here if it could be added, e.g., satoshi: ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        // Keeping previously halved sizes as a baseline for the new compact design
        'h1-spec': ['14px', { lineHeight: '1.3', letterSpacing: '0em' }],
        'h2-spec': ['12px', { lineHeight: '1.26', letterSpacing: '-0.01em' }],
        'h3-spec': ['10px', { lineHeight: '1.22', letterSpacing: '-0.01em' }],
        'large-bold-spec': ['9px', { lineHeight: '1.48', letterSpacing: '0em' }],
        'large-semibold-spec': ['9px', { lineHeight: '1.23', letterSpacing: '-0.01em' }],
        'caption-spec': ['7px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'small-bold-spec': ['7px', { lineHeight: '1.48', letterSpacing: '0em' }],
        'button1-spec': ['8px', { lineHeight: '1.26', letterSpacing: '0em' }],
        'button2-spec': ['7px', { lineHeight: '1.26', letterSpacing: '0em' }],
        'button3-spec': ['6px', { lineHeight: '1.26', letterSpacing: '0em' }],

        // Added a few more general purpose sizes reflecting the design
        '2xs': '0.625rem', // 10px
        '3xs': '0.5rem',   // 8px
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: { // Updated border radius based on new design
        lg: 'var(--radius)', // 0.75rem - for larger cards, modal like elements
        md: 'calc(var(--radius) - 0.25rem)', // 0.5rem - for buttons, inputs
        sm: 'calc(var(--radius) - 0.375rem)', // 0.375rem - for smaller elements like tags
        xl: 'calc(var(--radius) + 0.25rem)', // 1rem - more rounded
        '2xl': 'calc(var(--radius) + 0.75rem)', // 1.5rem - even more rounded (e.g. bottom sheet style)
        full: '9999px',
      },
      boxShadow: { 
        'top-md': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
        'primary-glow': '0 0 15px 2px hsl(var(--primary) / 0.3)', // Glow effect for primary elements
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
