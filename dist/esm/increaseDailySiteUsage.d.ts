/**
 * Increases the daily site usage count by a given amount (default = 1).
 * Uses the same "dailySiteUsage" cookie structure as canUseSiteToday().
 *
 * @param amount - How much to increase today's usage by (default 1)
 * @returns The updated usage count for today
 */
export declare const increaseDailySiteUsage: (amount?: number) => number;
