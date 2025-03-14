/**
 * Checks if a user can use a feature based on monthly usage limits
 * @param {number} maxMonthlyUses - Maximum uses allowed per month
 * @param {string} feature - The feature to limit.
 * @returns {boolean} - Whether usage is allowed
 */
export declare const canUsePerMonth: (maxMonthlyUses: number, feature: string) => boolean;
