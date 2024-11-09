import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const MODE = process.env.NODE_ENV;
const API_URL =
	MODE == 'development' ? 'http://localhost:1000' : 'https://whiteboard-axbr.onrender.com/';

console.log(API_URL);

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': API_URL
		}
	}
});
