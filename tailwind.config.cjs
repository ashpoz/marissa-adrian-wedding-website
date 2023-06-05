/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: {
			"peach": {
				100: "#FAE4D8",
				200: "#F8D4C1",
				300: "#F2B494",
				400: "#F0A47D"
			},
			"almond": "#EDE2D6",
			"dark-slate-gray": "#37514D",
			"green": "#6A715D",
			"redwood": "#B6594C",
			"burgundy": "#91453B",
			"crimson": "#880D1E",
			"white": "#fff",
			"black": "151612",
		},
		extend: {
			fontFamily: {
				display: ["Noto Serif Display Variable", "serif"],
				serif: ["Merriweather", "serif"],
			},
		},
	},
	plugins: [],
}
