import { APISourceURLs } from "./APISource";

/**
 * Check if the user is logged in
 * @returns True if the user is logged in, false otherwise
 */
export async function isLoggedIn(): Promise<boolean> {
    const token = sessionStorage.getItem("jwttoken");
    if (!token)
        return false;
    return await checkToken(token);
}

/**
 * Fetches a resource from the AI System API with authentication.
 * Will fail if the token is timed out, and will redirect to the login page.
 * @param input The URL to fetch
 * @param init The fetch init object
 * @param token The JWT token to use
 */
export async function fetchAuthenticated(input: RequestInfo | URL, token: string, init?: RequestInit | undefined): Promise<Response | undefined> { 
    if (!checkToken(token)) {
        window.location.href = "/timeout";
        return undefined;
    }

    const response = await fetch(input, {
        ...init,
        headers: {
            ...init?.headers,
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok)
        throw new Error("Request failure!");
    return response;
}

/**
 * Check if the current JWT token is valid and refresh it 
 * @param token The JWT token to check
 * @returns Whether the token is valid
 */
export async function checkToken(token: string): Promise<boolean> {
    const response = await fetch(`${APISourceURLs.aiSystemAPI}/identity/account/check`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }); 
    if (response.status === 401)
        throw new Error("Timeout");
    if (!response.ok)
        throw new Error("Request failure!");
    return true;
}

/**
 * Register a new accountawait response.json();
 * @param username The username of the new account
 * @param email The email of the new account
 * @param password The password of the new account
 * @returns The JWT token of the new account
 */
export async function registerAccount(username: string, email: string, password: string): Promise<string> {
    const response = await fetch(`${APISourceURLs.aiSystemAPI}/identity/account/register`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    }); 
    if (!response.ok)
        throw new Error("Request failure!");
    // Store the token in the session storage
    const token = await response.text();
    sessionStorage.setItem("jwttoken", token);
    return token;
}

/**
 * Login to an account
 * @param username The username of the account
 * @param password The password of the account
 * @returns The JWT token of the account
 */
export async function loginAccount(usernameoremail: string, password: string): Promise<string> {
    const response = await fetch(`${APISourceURLs.aiSystemAPI}/identity/account/login`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usernameoremail, password })
    }); 
    if (!response.ok)
        throw new Error("Request failure!");
    // Store the token in the session storage
    const token = await response.text();
    sessionStorage.setItem("jwttoken", token);
    return token;
}

/**
 * Logout of the current account
 */
export function logoutAccount(): void {
    const token = sessionStorage.getItem("jwttoken");
    if (!token)
        return;
    sessionStorage.removeItem("jwttoken");
    window.location.href = "/";
}

/**
 * Get the username of the current account
 * @returns The username of the current account
 */
export async function getUsername(): Promise<string> {
    const token = sessionStorage.getItem("jwttoken");
    if (!token)
        return "";
    const response = await fetchAuthenticated(`${APISourceURLs.aiSystemAPI}/identity/account/username`, token, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }) as Response; 
    if (!response.ok)
        throw new Error("Request failure!");
    return await response.text();
}