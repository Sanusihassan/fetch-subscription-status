"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAITokens = exports.getTranslateUnits = exports.getUserBalance = void 0;
// ✅ FRONTEND - getUserBalance.ts (new file or replace old ones)
const axios_1 = __importDefault(require("axios"));
const endpoint = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";
/**
 * Fetch both translate units and AI tokens for authenticated user
 * ✅ SECURE: No userId needed - uses JWT from httpOnly cookie
 */
const getUserBalance = async (baseURL = `${endpoint}/auth`) => {
    try {
        const response = await axios_1.default.get(`${baseURL}/balance`, {
            withCredentials: true
        });
        if (!response.data.success) {
            throw new Error('Failed to fetch balance');
        }
        return response.data.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
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
exports.getUserBalance = getUserBalance;
// ✅ Convenience functions for backward compatibility (optional)
const getTranslateUnits = async (baseURL) => {
    const balance = await (0, exports.getUserBalance)(baseURL);
    return balance.translateUnits;
};
exports.getTranslateUnits = getTranslateUnits;
const getAITokens = async (baseURL) => {
    const balance = await (0, exports.getUserBalance)(baseURL);
    return balance.aiTokens;
};
exports.getAITokens = getAITokens;
