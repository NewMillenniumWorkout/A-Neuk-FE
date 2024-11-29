/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"black-aneuk": "#333333",
				"white-aneuk": "#F7F4EE",
				"text-aneuk": "#2c3e50",
				"gray-aneuk": "#cccccc",
				white: "#ffffff",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			keyframes: {
				"slide-up": {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
				floating: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
			},
			animation: {
				"slide-up": "slide-up 0.5s ease-out",
				floating: "floating 2.5s ease-in-out infinite",
			},
			boxShadow: {
				"custom-strong": "0 4px 8px rgba(0, 0, 0, 0.2)",
			},
			height: {
				"screen-dynamic": "calc(var(--vh, 1vh) * 100)",
			},
			fontFamily: {
				"pretendard-light": ["Pretendard-Light", "sans-serif"],
				"pretendard-regular": ["Pretendard-Regular", "sans-serif"],
				"pretendard-medium": ["Pretendard-Medium", "sans-serif"],
				"pretendard-bold": ["Pretendard-Bold", "sans-serif"],
				"gowun-regular": ["gowun-regular", "sans-serif"],
				"gowun-bold": ["gowun-bold", "sans-serif"],
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
