import { getAISystemModels } from "$lib/api/AISystemAPI";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	return {
		list: await getAISystemModels()
	};
};