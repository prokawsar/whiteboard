import { error } from '@sveltejs/kit';

export default function load({ params, url }) {
	const id = params.id;
	if (!id) {
		return error(404, 'Board not found');
	}
	const boardAccessToken = url.searchParams.get('boardAccessToken');
	//TODO: check for access
	// return according status

	return { boardAccessToken };
}
