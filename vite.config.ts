import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const MODE = process.env.NODE_ENV;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api':
				MODE == 'development' ? 'http://localhost:1000' : 'https://whiteboard-axbr.onrender.com/'
		}
	}
});
