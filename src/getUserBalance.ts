// ✅ FRONTEND - getUserBalance.ts (new file or replace old ones)
import axios from "axios";

const endpoint =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "";

export interface BalanceResponse {
    success: boolean;
    data: {
        translateUnits: number;
        aiTokens: number;
    };
}

/**
 * Fetch both translate units and AI tokens for authenticated user
 * ✅ SECURE: No userId needed - uses JWT from httpOnly cookie
 */
export const getUserBalance = async (
    baseURL: string = `${endpoint}/auth`
): Promise<{ translateUnits: number; aiTokens: number }> => {
    try {
        const response = await axios.get<BalanceResponse>(
            `${baseURL}/balance`,
            {
                withCredentials: true
            }
        );

        if (!response.data.success) {
            throw new Error('Failed to fetch balance');
        }

        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Not authenticated');
            }
            if (error.response?.status === 404) {
                throw new Error('User not found');
            }
            if (error.response?.status === 500) {
                throw new Error('Server error while fetching balance');
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch balance');
        }
        throw new Error('Network error while fetching balance');
    }
};

// ✅ Convenience functions for backward compatibility (optional)
export const getTranslateUnits = async (baseURL?: string): Promise<number> => {
    const balance = await getUserBalance(baseURL);
    return balance.translateUnits;
};

export const getAITokens = async (baseURL?: string): Promise<number> => {
    const balance = await getUserBalance(baseURL);
    return balance.aiTokens;
};