export interface BalanceResponse {
    success: boolean;
    data: {
        translateUnits: number;
        aiTokens: number;
        premiumConversions: number;
    };
}
/**
 * Fetch both translate units and AI tokens for authenticated user
 * ✅ SECURE: No userId needed - uses JWT from httpOnly cookie
 */
export declare const getUserBalance: (baseURL?: string) => Promise<BalanceResponse["data"]>;
export declare const getTranslateUnits: (baseURL?: string) => Promise<number>;
export declare const getAITokens: (baseURL?: string) => Promise<number>;
