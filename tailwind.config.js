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
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
