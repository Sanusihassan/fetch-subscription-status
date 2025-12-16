"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseSiteToday = void 0;
// canUseSiteToday.ts
const js_cookie_1 = __importDefault(require("js-cookie"));
/**
 * Checks if the user has remaining usage allowance for today.
 * Does NOT modify the usage count - use increaseDailySiteUsage() for that.
 *
 * @param maxDailyUses - Maximum allowed uses per day (default 10)
 * @returns true if user can still use the site, false if limit reached
 */
const canUseSiteToday = (maxDailyUses = 10) => {
    const today = new Date().toISOString().split('T')[0];
    // Read existing usage
    const usageData = JSON.parse(js_cookie_1.default.get('dailySiteUsage') || '{}');
    // Get today's usage count (default to 0 if not set)
    const todayUsage = usageData[today] || 0;
    // Return true if under limit, false if at or over limit
    return todayUsage < maxDailyUses;
};
exports.canUseSiteToday = canUseSiteToday;
