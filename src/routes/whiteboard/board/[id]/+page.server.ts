import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	const id = params.id;
	if (!id) {
		return error(404, 'Invalid id provided');
	}
	const response = await fetch('/api/board/' + id);
	if (!response.ok) {
		error(400, {
			message: 'Board not found'
		});
	}

	return { data: await response.json() };
};
