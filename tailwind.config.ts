import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			primary: "#597081",
			secondary: "#7EA0B7",
			tertiary: '#36494E',
			uranian: '#A9CEF4',
			success: '#2E7D32',
			info: '#0289D1',
			warning: '#ED6C02',
			error: '#D32F2F',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			white: '#ffffff',
			black: '#000000',
			bgWhite: '#f9f9f9',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
	plugins: [
		require('tailwindcss-animated')
	],
} satisfies Config;
