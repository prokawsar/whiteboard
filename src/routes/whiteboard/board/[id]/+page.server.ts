import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const id = params.id;
	if (!id) {
		return error(404, 'Board not found');
	}
	//TODO: Check room id exist in server database

	return {};
};
