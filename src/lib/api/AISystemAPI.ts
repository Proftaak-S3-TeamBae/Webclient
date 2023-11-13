import type { AISystemModel } from "$lib/types/api/AISystemModel";
import { APISourceURLs } from "./APISource";

/**
 * Gets AI systems.
 * @returns {AISystemModel[]} A list of AI models.
 */
export async function getAISystemModels(): Promise<AISystemModel[]> {
    const req = await fetch(`${APISourceURLs.aiSystemAPI}/AiSystem`);

    if(!req.ok)
        throw new Error("Request failure!");

    return await req.json();
}