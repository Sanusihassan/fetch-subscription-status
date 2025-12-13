"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatus = exports.SubscriptionPlan = void 0;
exports.fetchSubscriptionStatus = fetchSubscriptionStatus;
exports.getUserSubscription = getUserSubscription;
// fetchSubscriptionStatus.ts - SECURE VERSION
const axios_1 = __importDefault(require("axios"));
const endpoint = process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // Your auth API endpoint
    : ""; // Production endpoint
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["MONTHLY"] = "monthly";
    SubscriptionPlan["YEARLY"] = "yearly";
    SubscriptionPlan["MONTHLY_PRO"] = "monthly_pro";
    SubscriptionPlan["YEARLY_PRO"] = "yearly_pro";
    SubscriptionPlan["TRIAL"] = "trial";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["INACTIVE"] = "inactive";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["PAST_DUE"] = "past_due";
    SubscriptionStatus["PAUSED"] = "paused";
    SubscriptionStatus["TRIALING"] = "trialing";
    SubscriptionStatus["PROCESSING"] = "processing";
    SubscriptionStatus["PENDING"] = "pending";
    SubscriptionStatus["PAYMENT_FAILED"] = "payment_failed";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
// ✅ SECURE: Simple function that relies on backend verification
async function fetchSubscriptionStatus() {
    try {
        const response = await axios_1.default.get(`${endpoint}/subscription`, // ✅ No userId in URL!
        {
            withCredentials: true // ✅ Sends httpOnly cookies automatically
        });
        return response.data.success && response.data.data?.status === 'active';
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            // 404 means no subscription, not an error
            if (error.response?.status === 404) {
                return false;
            }
            // 401 means not authenticated
            if (error.response?.status === 401) {
                console.log('User not authenticated');
                return false;
            }
        }
        console.error('Error fetching subscription status:', error);
        return false;
    }
}
// ✅ SECURE: Get full subscription details
async function getUserSubscription() {
    try {
        const response = await axios_1.default.get(`${endpoint}/subscription`, // ✅ No userId in URL!
        {
            withCredentials: true // ✅ Sends httpOnly cookies automatically
        });
        if (response.data.success && response.data.data) {
            return {
                isActive: response.data.data.status === 'active',
                subscription: response.data.data
            };
        }
        return {
            isActive: false,
            subscription: null
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return {
                    isActive: false,
                    subscription: null
                };
            }
            if (error.response?.status === 401) {
                console.log('User not authenticated');
                return {
                    isActive: false,
                    subscription: null
                };
            }
        }
        console.error('Error fetching subscription:', error);
        return {
            isActive: false,
            subscription: null
        };
    }
}
