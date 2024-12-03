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
				spin: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"slide-up": "slide-up 0.5s ease-out",
				floating: "floating 2.5s ease-in-out infinite",
				spinner: "spin 1s linear infinite",
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
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
