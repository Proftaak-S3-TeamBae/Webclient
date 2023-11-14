import type { AISystemModel } from "$lib/types/api/AISystemModel";
import { APISourceURLs } from "./APISource";
import type { PagedAPIResponse } from "./PagedAPIResponse";

/**
 * Gets AI systems.
 * @returns A list of AI models.
 */
export async function getAISystemModels(page: number = 0): Promise<PagedAPIResponse<AISystemModel[]>> {
    const req = await fetch(`${APISourceURLs.aiSystemAPI}/AiSystem?page=${page}`);

    if(!req.ok)
        throw new Error("Request failure!");

    return await req.json();
}