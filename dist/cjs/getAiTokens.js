"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAITokens = void 0;
// getAITokens.ts
const axios_1 = __importDefault(require("axios"));
const endpoint = process.env.NODE_ENV === "development"
    ? "https://www.pdfequips.com"
    : "";
/**
 * Fetch AI tokens for a specific user by ID
 * @param userId - The user ID to fetch AI tokens for
 * @param baseURL - Your API base URL (defaults to endpoint)
 * @returns Promise<number> - The number of AI tokens
 */
const getAITokens = async (userId, baseURL = `${endpoint}/auth`) => {
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
        const response = await axios_1.default.get(`${baseURL}/ai-tokens/${userId}`, config);
        return response.data.aiTokens;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error('Invalid user ID provided');
            }
            if (error.response?.status === 404) {
                throw new Error('User not found');
            }
            if (error.response?.status === 500) {
                throw new Error('Server error while fetching AI tokens');
            }
            // Handle other API errors
            const apiError = error.response?.data;
            throw new Error(apiError?.message || 'Failed to fetch AI tokens');
        }
        throw new Error('Network error while fetching AI tokens');
    }
};
exports.getAITokens = getAITokens;
