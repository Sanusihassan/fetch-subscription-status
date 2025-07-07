// index.ts (complete package index)
import { getTranslateUnits } from './getTranslateUnits';
import { getUserInfo } from './getUserInfo';
import { fetchSubscriptionStatus } from './fetchSubscriptionStatus';
import { canUseSiteToday } from './canUseSiteToday';
import { canUsePerMonth } from './canUsePerMonth';

// Named exports
export * from './fetchSubscriptionStatus';
export * from "./canUseSiteToday";
export * from "./canUsePerMonth";
export * from "./getUserInfo";
export * from "./getTranslateUnits";

// Default export for compatibility
export default {
    getTranslateUnits,
    getUserInfo,
    fetchSubscriptionStatus,
    canUseSiteToday,
    canUsePerMonth,
};