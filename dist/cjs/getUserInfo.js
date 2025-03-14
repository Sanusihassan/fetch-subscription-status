"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = getUserInfo;
const js_cookie_1 = __importDefault(require("js-cookie"));
const axios_1 = __importDefault(require("axios"));
const jwt_decode_1 = require("jwt-decode");
// Define the API endpoint based on environment
const endpoint = process.env.NODE_ENV === "development"
    ? "https://refactored-space-couscous-r65x9p4pxqghw7gv-3000.app.github.dev/"
    : "";
/**
 * Retrieves the currently signed-in user's information.
 * @returns A Promise resolving to UserInfo if the user is signed in, or null if not.
 */
async function getUserInfo() {
    try {
        // Step 1: Check for 'userInfo' cookie
        const userInfoStr = js_cookie_1.default.get('userInfo');
        if (userInfoStr) {
            // Parse the JSON string from the cookie and return it
            const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
            return userInfo;
        }
        // Step 2: Fallback to 'userToken' cookie
        const userToken = js_cookie_1.default.get('userToken');
        if (userToken) {
            // Decode the JWT to get user details
            const decodedToken = (0, jwt_decode_1.jwtDecode)(userToken);
            // Check if the token has expired
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decodedToken.exp < currentTime) {
                // Token is expired, treat as no user signed in
                return null;
            }
            // Fetch user info from the server using the user ID
            const userId = decodedToken.id;
            const response = await axios_1.default.get(`${endpoint}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            // Return the fetched user info
            return response.data;
        }
        // Step 3: No valid cookies found, return null
        return null;
    }
    catch (error) {
        // Log any errors and return null
        console.error('Error getting user info:', error);
        return null;
    }
}
