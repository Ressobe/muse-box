import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    colors: {
      'background-color': '#171819',
      'text-color': '#ffffff',
      'primary-color': '#6F2DA8',
      'secondary-color': '#4B0082',
      'accent-color': '#800080',
    }
  }
}
export default config
