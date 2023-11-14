export interface AISystemModel {
    name: string;
    type: "LLM" | string;
    source: "OpenAI" | string;
    description: string;
    date_added: string;
}