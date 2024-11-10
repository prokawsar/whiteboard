export const getOrCreateUUID = () => {
	let uuid = localStorage.getItem('_anonId');
	if (!uuid) {
		uuid = crypto.randomUUID();
		localStorage.setItem('_anonId', uuid);
	}
	return uuid;
};
