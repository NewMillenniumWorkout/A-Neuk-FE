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
			clipPath: {
				"round-40": "inset(0 round 40%)",
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
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
