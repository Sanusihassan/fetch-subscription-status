/**
 * Fetch translate units for a specific user by ID
 * @param userId - The user ID to fetch translate units for
 * @param baseURL - Your API base URL (defaults to endpoint)
 * @returns Promise<number> - The number of translate units
 */
export declare const getTranslateUnits: (userId: string, baseURL?: string) => Promise<number>;
