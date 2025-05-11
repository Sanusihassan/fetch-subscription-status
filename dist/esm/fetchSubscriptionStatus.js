"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatus = exports.SubscriptionPlan = void 0;
exports.fetchSubscriptionStatus = fetchSubscriptionStatus;
exports.getUserSubscription = getUserSubscription;
const js_cookie_1 = __importDefault(require("js-cookie"));
const axios_1 = __importDefault(require("axios"));
const jwt_decode_1 = require("jwt-decode");
const endpoint = process.env.NODE_ENV === "development"
    ? "https://www.pdfequips.com"
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
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["MONTHLY"] = "monthly";
    SubscriptionPlan["YEARLY"] = "yearly";
    SubscriptionPlan["TRIAL"] = "trial";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["INACTIVE"] = "inactivate";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["PAST_DUE"] = "past_due";
    SubscriptionStatus["PAUSED"] = "paused";
    SubscriptionStatus["TRIALING"] = "trialing";
    SubscriptionStatus["PROCESSING"] = "processing";
    SubscriptionStatus["PENDING"] = "pending";
    SubscriptionStatus["PAYMENT_FAILED"] = "payment_failed";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
async function getUserSubscription() {
    try {
        let userId = null;
        // Check userInfo cookie first
        const userInfoStr = js_cookie_1.default.get('userInfo');
        if (userInfoStr) {
            const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
            userId = userInfo.id;
        }
        // Fallback to userToken if userInfo is not available
        if (!userId) {
            const userToken = js_cookie_1.default.get('userToken');
            if (userToken) {
                const decodedToken = (0, jwt_decode_1.jwtDecode)(userToken);
                userId = decodedToken.id;
            }
        }
        // If we have a userId, try to fetch subscription
        if (userId) {
            const response = await axios_1.default.get(`${endpoint}/subscription/${userId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            if (response.data.success && response.data.data) {
                return {
                    isActive: response.data.data.status === 'active',
                    subscription: response.data.data
                };
            }
        }
        // Default to non-premium if no valid cookies found or no subscription data
        return {
            isActive: false,
            subscription: null
        };
    }
    catch (error) {
        console.error('Error fetching subscription status:', error);
        return {
            isActive: false,
            subscription: null
        };
    }
}
