import { getAISystemModels } from "$lib/api/AISystemAPI";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
	return {
		list: (async function() {
			const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page') as string) : 0;
			return await getAISystemModels(page);
		})()
	};
};