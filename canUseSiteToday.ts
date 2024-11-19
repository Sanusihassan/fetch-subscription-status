import Cookies from 'js-cookie';

export const canUseSiteToday = (maxDailyUses = 10): boolean => {
  const today = new Date().toISOString().split('T')[0];

  // Read existing usage
  const usageData = JSON.parse(
    Cookies.get('dailySiteUsage') || '{}'
  );

  // Initialize today's data if not exists
  usageData[today] = (usageData[today] || 0) + 1;

  // Check usage limit
  if (usageData[today] > maxDailyUses) {
    return false; // Limit exceeded
  }

  // Save updated usage
  Cookies.set('dailySiteUsage', JSON.stringify(usageData), {
    expires: 1, // 1 day expiry
    path: '/'
  });

  return true; // Usage allowed
};