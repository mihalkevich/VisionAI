import type {Config} from 'tailwindcss';

export default {
  darkMode: 'class', // Keep dark mode enabled via class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: { // Add container default settings
      center: true,
      padding: {
        DEFAULT: '1rem', // Default padding for containers
        sm: '1rem', 
        // md: '1.5rem', // mobile already has px-4 (1rem)
        // lg: '2rem', // Adjusted in specific page layouts if needed
        // xl: '2rem',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'Manrope', 'sans-serif'], // Use Inter as primary
        headline: ['var(--font-inter)', 'Manrope', 'sans-serif'],
        code: ['monospace'],
      },
      fontSize: {
        'h1-spec': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0em' }], // 14px (was 28px)
        'h2-spec': ['0.75rem', { lineHeight: '1.26', letterSpacing: '-0.01em' }], // 12px (was 24px)
        'h3-spec': ['0.625rem', { lineHeight: '1.22', letterSpacing: '-0.01em' }], // 10px (was 20px)
        'large-bold-spec': ['0.5625rem', { lineHeight: '1.48', letterSpacing: '0em' }], // 9px (was 18px)
        'large-semibold-spec': ['0.5625rem', { lineHeight: '1.23', letterSpacing: '-0.01em' }], // 9px (was 18px)
        'caption-spec': ['0.4375rem', { lineHeight: '1.4', letterSpacing: '0.02em' }], // 7px (was 13px)
        'small-bold-spec': ['0.4375rem', { lineHeight: '1.48', letterSpacing: '0em' }], // 7px (was 14px)
        'button1-spec': ['0.5rem', { lineHeight: '1.26', letterSpacing: '0em' }], // 8px (was 16px)
        'button2-spec': ['0.4375rem', { lineHeight: '1.26', letterSpacing: '0em' }], // 7px (was 14px)
        'button3-spec': ['0.375rem', { lineHeight: '1.26', letterSpacing: '0em' }], // 6px (was 12px)
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)', // For more rounded elements like buttons if needed
        full: '9999px', // For pill-shaped buttons
      },
      boxShadow: { // Add custom shadows
        'top-md': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
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
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
