import type { Config } from 'tailwindcss';
import { join } from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import { skeleton } from '@skeletonlabs/tw-plugin';
import { defaultBibleTrainerTheme } from './default-theme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton({
			themes: {
				preset: [ 'skeleton', 'modern', 'crimson'],
				custom: [ defaultBibleTrainerTheme ]
			}
		}),
		forms,
		typography,
	]
} satisfies Config;

export default config;
