export async function load({ fetch }) {
	const response = await fetch('/api/hello', { method: 'post' });
	const data = await response.json();

	return {
		data
	};
}
