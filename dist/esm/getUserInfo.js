"use strict";
// ✅ SECURE FRONTEND
// getUserInfo.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = getUserInfo;
const js_cookie_1 = __importDefault(require("js-cookie"));
const axios_1 = __importDefault(require("axios"));
const endpoint = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";
/**
 * Retrieves the currently signed-in user's information.
 * ✅ SECURE VERSION: Uses httpOnly cookie, no userId extraction
 * @returns A Promise resolving to UserInfo if the user is signed in, or null if not.
 */
async function getUserInfo() {
    try {
        // Step 1: Try userInfo cookie first (faster, no API call needed)
        const userInfoStr = js_cookie_1.default.get('userInfo');
        if (userInfoStr) {
            try {
                const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
                return userInfo;
            }
            catch (parseError) {
                console.error('Error parsing userInfo cookie:', parseError);
                // Fall through to API call
            }
        }
        // Step 2: Fallback to API call using httpOnly userToken cookie
        // ✅ SECURE: No userId, no API_SECRET_KEY - just withCredentials
        const response = await axios_1.default.get(`${endpoint}/auth/user`, // ✅ No userId in URL!
        {
            withCredentials: true // ✅ Sends httpOnly cookie automatically
        });
        if (response.data.success && response.data.data) {
            return response.data.data;
        }
        return null;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            // 401 means not authenticated - this is normal, not an error
            if (error.response?.status === 401) {
                return null;
            }
            // 404 means user not found
            if (error.response?.status === 404) {
                console.warn('User not found');
                return null;
            }
        }
        console.error('Error getting user info:', error);
        return null;
    }
}
