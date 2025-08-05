/**
 * Fetch AI tokens for a specific user by ID
 * @param userId - The user ID to fetch AI tokens for
 * @param baseURL - Your API base URL (defaults to endpoint)
 * @returns Promise<number> - The number of AI tokens
 */
export declare const getAITokens: (userId: string, baseURL?: string) => Promise<number>;
