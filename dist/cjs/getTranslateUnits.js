"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslateUnits = void 0;
// getTranslateUnits.ts
const axios_1 = __importDefault(require("axios"));
const endpoint = process.env.NODE_ENV === "development"
    ? "https://www.pdfequips.com"
    : "";
/**
 * Fetch translate units for a specific user by ID
 * @param userId - The user ID to fetch translate units for
 * @param baseURL - Your API base URL (defaults to endpoint)
 * @returns Promise<number> - The number of translate units
 */
const getTranslateUnits = async (userId, baseURL = `${endpoint}/auth`) => {
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
        const response = await axios_1.default.get(`${baseURL}/translate-units/${userId}`, config);
        return response.data.translateUnits;
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
                throw new Error('Server error while fetching translate units');
            }
            // Handle other API errors
            const apiError = error.response?.data;
            throw new Error(apiError?.message || 'Failed to fetch translate units');
        }
        throw new Error('Network error while fetching translate units');
    }
};
exports.getTranslateUnits = getTranslateUnits;
