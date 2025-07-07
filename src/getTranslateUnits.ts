// getTranslateUnits.ts
import axios from "axios";

const endpoint =
    process.env.NODE_ENV === "development"
        ? "https://www.pdfequips.com"
        : "";

// Types for the API response
interface TranslateUnitsResponse {
    translateUnits: number;
}

interface ApiError {
    error: string;
    message: string;
}

/**
 * Fetch translate units for a specific user by ID
 * @param userId - The user ID to fetch translate units for
 * @param baseURL - Your API base URL (defaults to endpoint)
 * @returns Promise<number> - The number of translate units
 */
export const getTranslateUnits = async (
    userId: string,
    baseURL: string = `${endpoint}/auth`
): Promise<number> => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };

        const response = await axios.get<TranslateUnitsResponse>(
            `${baseURL}/translate-units/${userId}`,
            config
        );

        return response.data.translateUnits;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error('Invalid user ID provided');
            }
            if (error.response?.status === 404) {
                throw new Error('User not found');
            }
            if (error.response?.status === 500) {
                throw new Error('Server error while fetching translate units');
            }
            // Handle other API errors
            const apiError = error.response?.data as ApiError;
            throw new Error(apiError?.message || 'Failed to fetch translate units');
        }
        throw new Error('Network error while fetching translate units');
    }
};