/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: "true",
				padding: {
					DEFAULT: "20px",
					xl: "80px",
				},
			},
			boxShadow: {
				"custom-glow": "0 0 40px 10px oklch(var(--p) / 0.5)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				border: "oklch(var(--bc)/0.2)",
				input: "oklch(var(--bc)/0.2)",
				ring: "oklch(var(--bc))",
				background: "oklch(var(--b2))",
				foreground: "oklch(var(--bc))",
				destructive: {
					DEFAULT: "oklch(var(--er))",
					foreground: "oklch(var(--erc))",
				},
				muted: {
					DEFAULT: "oklch(var(--b1))",
					foreground: "oklch(var(--bc))",
				},
				popover: {
					DEFAULT: "oklch(var(--b1))",
					foreground: "oklch(var(--bc))",
				},
				card: {
					DEFAULT: "oklch(var(--b1))",
					foreground: "oklch(var(--bc))",
				},
				"primary-focus": "oklch(var(--primary-focus))",
				"secondary-focus": "oklch(var(--secondary-focus))",
				"accent-focus": "oklch(var(--accent-focus))",
				"neutral-focus": "oklch(var(--neutral-focus))",
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
		},
	},
	plugins: [require("daisyui"), require("tailwindcss-animate")],
	daisyui: {
		themes: [
			{
				light: {
					primary: "#F2811D",
					"--primary-focus": "64.25% 0.1621 51.46", // oklch(64.25% 0.1621 51.46)
					"primary-content": "#FFFFFF",

					secondary: "#4A90E2",
					"--secondary-focus": "56.76% 0.1249 250.43", //oklch(56.76% 0.1249 250.43)
					"secondary-content": "#FFFFFF",

					accent: "#8E44AD",
					"--accent-focus": "44.35% 0.1639 313.95", //oklch(44.35% 0.1639 313.95)
					"accent-content": "#FFFFFF",

					neutral: "#F7F9FB",
					"--neutral-focus": "92.88% 0.0126 255.51", //oklch(92.88% 0.0126 255.51)
					"neutral-content": "#2D3748",

					"base-100": "#FFFFFF",
					"base-200": "#F1F5F9",
					"base-300": "#E2E8F0",
					"base-content": "#2D3748",

					info: "#3ABFF8",
					success: "#4CAF50",
					warning: "#FF9800",
					error: "#F44336",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "1.9rem",
					"--animation-btn": ".25s",
					"--animation-input": ".2s",
					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
			{
				dark: {
					primary: "#F2811D",
					"--primary-focus": "64.25% 0.1621 51.46", //oklch(64.25% 0.1621 51.46)
					"primary-content": "#FFFFFF",

					secondary: "#4A90E2",
					"--secondary-focus": "56.76% 0.1249 250.43", // oklch(56.76% 0.1249 250.43)
					"secondary-content": "#2D3748",

					accent: "#8E44AD",
					"--accent-focus": "44.35% 0.1639 313.95", //oklch(44.35% 0.1639 313.95)
					"accent-content": "#2D3748",

					neutral: "#1A202C",
					"--neutral-focus": "33.51% 0.0331 260.91", //oklch(33.51% 0.0331 260.91)
					"neutral-content": "#E2E8F0",

					"base-100": "#000000",
					"base-200": "#2D3748",
					"base-300": "#4A5568",
					"base-content": "#FFFFFF",

					info: "#3ABFF8",
					success: "#4CAF50",
					warning: "#FF9800",
					error: "#F44336",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "1.9rem",
					"--animation-btn": ".25s",
					"--animation-input": ".2s",
					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
		],
	},
};
