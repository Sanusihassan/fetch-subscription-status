// canUseSiteToday.ts
import Cookies from 'js-cookie';

/**
 * Checks if the user has remaining usage allowance for today.
 * Does NOT modify the usage count - use increaseDailySiteUsage() for that.
 *
 * @param maxDailyUses - Maximum allowed uses per day (default 10)
 * @returns true if user can still use the site, false if limit reached
 */
export const canUseSiteToday = (maxDailyUses = 10): boolean => {
  const today = new Date().toISOString().split('T')[0];

  // Read existing usage
  const usageData = JSON.parse(
    Cookies.get('dailySiteUsage') || '{}'
  ) as Record<string, number>;

  // Get today's usage count (default to 0 if not set)
  const todayUsage = usageData[today] || 0;

  // Return true if under limit, false if at or over limit
  return todayUsage < maxDailyUses;
};