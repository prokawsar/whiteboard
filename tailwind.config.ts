import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			cursor: {
				pen: 'url(/images/pen.png), pointer'
			}
		}
	},

	plugins: [typography]
} as Config;
