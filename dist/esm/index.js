"use strict";
// src/index.ts
// Main entry point for the fetch-subscription-status package
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseSiteToday = exports.canUsePerMonth = exports.getUserInfo = exports.getAITokens = exports.getTranslateUnits = exports.getUserBalance = exports.SubscriptionStatus = exports.SubscriptionPlan = exports.getUserSubscription = exports.fetchSubscriptionStatus = void 0;
// Export subscription status functions
var fetchSubscriptionStatus_1 = require("./fetchSubscriptionStatus");
Object.defineProperty(exports, "fetchSubscriptionStatus", { enumerable: true, get: function () { return fetchSubscriptionStatus_1.fetchSubscriptionStatus; } });
Object.defineProperty(exports, "getUserSubscription", { enumerable: true, get: function () { return fetchSubscriptionStatus_1.getUserSubscription; } });
Object.defineProperty(exports, "SubscriptionPlan", { enumerable: true, get: function () { return fetchSubscriptionStatus_1.SubscriptionPlan; } });
Object.defineProperty(exports, "SubscriptionStatus", { enumerable: true, get: function () { return fetchSubscriptionStatus_1.SubscriptionStatus; } });
// Export balance functions
var getUserBalance_1 = require("./getUserBalance");
Object.defineProperty(exports, "getUserBalance", { enumerable: true, get: function () { return getUserBalance_1.getUserBalance; } });
Object.defineProperty(exports, "getTranslateUnits", { enumerable: true, get: function () { return getUserBalance_1.getTranslateUnits; } });
Object.defineProperty(exports, "getAITokens", { enumerable: true, get: function () { return getUserBalance_1.getAITokens; } });
// Export user info functions
var getUserInfo_1 = require("./getUserInfo");
Object.defineProperty(exports, "getUserInfo", { enumerable: true, get: function () { return getUserInfo_1.getUserInfo; } });
// Export usage limit functions
var canUsePerMonth_1 = require("./canUsePerMonth");
Object.defineProperty(exports, "canUsePerMonth", { enumerable: true, get: function () { return canUsePerMonth_1.canUsePerMonth; } });
var canUseSiteToday_1 = require("./canUseSiteToday");
Object.defineProperty(exports, "canUseSiteToday", { enumerable: true, get: function () { return canUseSiteToday_1.canUseSiteToday; } });
