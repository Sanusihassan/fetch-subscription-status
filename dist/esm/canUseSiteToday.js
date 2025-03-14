"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseSiteToday = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const canUseSiteToday = (maxDailyUses = 10) => {
    const today = new Date().toISOString().split('T')[0];
    // Read existing usage
    const usageData = JSON.parse(js_cookie_1.default.get('dailySiteUsage') || '{}');
    // Initialize today's data if not exists
    usageData[today] = (usageData[today] || 0) + 1;
    // Check usage limit
    if (usageData[today] > maxDailyUses) {
        return false; // Limit exceeded
    }
    // Save updated usage
    js_cookie_1.default.set('dailySiteUsage', JSON.stringify(usageData), {
        expires: 1, // 1 day expiry
        path: '/'
    });
    return true; // Usage allowed
};
exports.canUseSiteToday = canUseSiteToday;
