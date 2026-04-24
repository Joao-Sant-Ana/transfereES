import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        institucional: {
          navy: '#12355B',
          teal: '#1F7A8C',
          light: '#F3F6FA',
          border: '#DCE3EC'
        }
      }
    }
  },
  plugins: []
};

export default config;
