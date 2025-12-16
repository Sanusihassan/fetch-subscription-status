"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseDailySiteUsage = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
/**
 * Increases the daily site usage count by a given amount (default = 1).
 * Uses the same "dailySiteUsage" cookie structure as canUseSiteToday().
 *
 * @param amount - How much to increase today's usage by (default 1)
 * @returns The updated usage count for today
 */
const increaseDailySiteUsage = (amount = 1) => {
    const today = new Date().toISOString().split("T")[0];
    // Read existing usage object
    const usageData = JSON.parse(js_cookie_1.default.get("dailySiteUsage") || "{}");
    // Increment today's count
    usageData[today] = (usageData[today] || 0) + amount;
    // Save updated usage
    js_cookie_1.default.set("dailySiteUsage", JSON.stringify(usageData), {
        expires: 1, // expires in 1 day
        path: "/",
    });
    return usageData[today];
};
exports.increaseDailySiteUsage = increaseDailySiteUsage;
