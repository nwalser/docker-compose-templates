import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [
		'.svelte',
		'.md'
	],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: 'src/routes/+layout.svelte',
			},
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			'src': 'src',
		}
	}
};

export default config;
