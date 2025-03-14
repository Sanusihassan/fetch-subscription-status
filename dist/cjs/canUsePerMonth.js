"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUsePerMonth = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
/**
 * Checks if a user can use a feature based on monthly usage limits
 * @param {number} maxMonthlyUses - Maximum uses allowed per month
 * @param {string} feature - The feature to limit.
 * @returns {boolean} - Whether usage is allowed
 */
const canUsePerMonth = (maxMonthlyUses = 3, feature) => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: "YYYY-MM"
    // Read existing usage
    const usageData = JSON.parse(js_cookie_1.default.get(`monthly-${feature}-Usage`) || '{}');
    // Initialize current month's data if not exists
    usageData[currentMonth] = (usageData[currentMonth] || 0) + 1;
    // Check usage limit
    if (usageData[currentMonth] > maxMonthlyUses) {
        return false; // Limit exceeded
    }
    // Save updated usage
    js_cookie_1.default.set(`monthly-${feature}-Usage`, JSON.stringify(usageData), {
        expires: 30,
        path: '/'
    });
    return true; // Usage allowed
};
exports.canUsePerMonth = canUsePerMonth;
