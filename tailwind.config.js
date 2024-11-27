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
				"pretendard-light": ["Pretendard Light"],
				"pretendard-regular": ["Pretendard Regular"],
				"pretendard-medium": ["Pretendard Medium"],
				"pretendard-bold": ["Pretendard Bold"],
				"gowun-regular": ["gowun-regular", "sans-serif"],
				"gowun-bold": ["gowun-bold", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
