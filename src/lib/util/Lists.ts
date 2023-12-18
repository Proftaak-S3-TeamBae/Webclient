import openaiLogo from "$lib/images/integrations/openai.svg";
import googleLogo from "$lib/images/integrations/google.svg";
import awsLogo from "$lib/images/integrations/aws.svg";

/**
 * Gets an AI system logo from a string.
 * @param logoId The ID of the logo to get the URL for.
 */
export function parseLogo(logoId: string) {
    switch (logoId.toLowerCase()) {
        default:
            return "";
        case "openai":
            return openaiLogo;
        case "google":
            return googleLogo;
        case "aws":
            return awsLogo;
    }
}