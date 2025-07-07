import { getUserInfo } from './getUserInfo';
import { fetchSubscriptionStatus } from './fetchSubscriptionStatus';
export * from './fetchSubscriptionStatus';
export * from "./canUseSiteToday";
export * from "./canUsePerMonth";
export * from "./getUserInfo";
export * from "./getTranslateUnits";
declare const _default: {
    getTranslateUnits: (userId: string, baseURL?: string) => Promise<number>;
    getUserInfo: typeof getUserInfo;
    fetchSubscriptionStatus: typeof fetchSubscriptionStatus;
    canUseSiteToday: (maxDailyUses?: number) => boolean;
    canUsePerMonth: (maxMonthlyUses: number, feature: string) => boolean;
};
export default _default;
