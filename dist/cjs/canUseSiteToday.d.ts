/**
 * Checks if the user has remaining usage allowance for today.
 * Does NOT modify the usage count - use increaseDailySiteUsage() for that.
 *
 * @param maxDailyUses - Maximum allowed uses per day (default 10)
 * @returns true if user can still use the site, false if limit reached
 */
export declare const canUseSiteToday: (maxDailyUses?: number) => boolean;
