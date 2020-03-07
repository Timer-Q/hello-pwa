import data from '../../mock/mi/index';

export async function getData() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data);
		});
	});
}
