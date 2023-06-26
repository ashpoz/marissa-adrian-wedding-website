/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '0rem',
			},
		},
		fontFamily: {
			display: ["Noto Serif Display Variable", "serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {
			colors: {
				"peach": {
					100: "#FAE4D8",
					200: "#F8D4C1",
					300: "#F2B494",
					400: "#F0A47D"
				},
				"almond": "#EDE2D6",
				"dark-slate-gray": "#37514D",
				"crimson": "#880D1E",
				"white": "#fff",
				"black": "#151612",
				"forest-green": {
					DEFAULT: "#6A715D",
					light: "#7E876E",
					dark: "#545A49",
				},
				"redwood": {
					DEFAULT: "#B6594C",
					light: "#BE6B60",
					dark: "#9F4C41"
				},
				"burgundy": {
					DEFAULT: "#91453B",
					light: "#AE5347",
					dark: "#823E35"
				},
			},
			typography: {
				DEFAULT: {
					css: {
						"--tw-prose-bullets": "#91453B",
						hr: {
							borderColor: "#91453B",
						},
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
	],
}
