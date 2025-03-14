"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSubscriptionStatus = fetchSubscriptionStatus;
const js_cookie_1 = __importDefault(require("js-cookie"));
const axios_1 = __importDefault(require("axios"));
const jwt_decode_1 = require("jwt-decode");
const endpoint = process.env.NODE_ENV === "development"
    ? "https://refactored-space-couscous-r65x9p4pxqghw7gv-3000.app.github.dev/"
    : "";
async function fetchSubscriptionStatus() {
    try {
        // Check userInfo cookie
        const userInfoStr = js_cookie_1.default.get('userInfo');
        if (userInfoStr) {
            const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
            const response = await axios_1.default.get(`${endpoint}/subscription/${userInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }
        // Fallback to userToken if userInfo is not available
        const userToken = js_cookie_1.default.get('userToken');
        if (userToken) {
            const decodedToken = (0, jwt_decode_1.jwtDecode)(userToken);
            const response = await axios_1.default.get(`${endpoint}/subscription/${decodedToken.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }
        // Default to non-premium if no valid cookies found
        return false;
    }
    catch (error) {
        console.error('Error fetching subscription status:', error);
        return false;
    }
}
