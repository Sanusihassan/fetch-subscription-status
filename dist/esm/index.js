"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts (complete package index)
const getTranslateUnits_1 = require("./getTranslateUnits");
const getUserInfo_1 = require("./getUserInfo");
const fetchSubscriptionStatus_1 = require("./fetchSubscriptionStatus");
const canUseSiteToday_1 = require("./canUseSiteToday");
const canUsePerMonth_1 = require("./canUsePerMonth");
const getAiTokens_1 = require("./getAiTokens");
// Named exports
__exportStar(require("./fetchSubscriptionStatus"), exports);
__exportStar(require("./canUseSiteToday"), exports);
__exportStar(require("./canUsePerMonth"), exports);
__exportStar(require("./getUserInfo"), exports);
__exportStar(require("./getTranslateUnits"), exports);
__exportStar(require("./getAiTokens"), exports);
// Default export for compatibility
exports.default = {
    getTranslateUnits: getTranslateUnits_1.getTranslateUnits,
    getUserInfo: getUserInfo_1.getUserInfo,
    fetchSubscriptionStatus: fetchSubscriptionStatus_1.fetchSubscriptionStatus,
    canUseSiteToday: canUseSiteToday_1.canUseSiteToday,
    canUsePerMonth: canUsePerMonth_1.canUsePerMonth,
    getAITokens: getAiTokens_1.getAITokens
};
