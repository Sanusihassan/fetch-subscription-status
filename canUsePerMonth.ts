// please complete the jsDoc
import Cookies from 'js-cookie';
/**
 * Checks if a user can use a feature based on monthly usage limits
 * @param {number} maxMonthlyUses - Maximum uses allowed per month
 * @param {string} feature - The feature to limit.
 * @returns {boolean} - Whether usage is allowed
 */
export const canUsePerMonth = (maxMonthlyUses = 3, feature: string) => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: "YYYY-MM"

    // Read existing usage
    const usageData = JSON.parse(
        Cookies.get(`monthly-${feature}-Usage`) || '{}'
    );

    // Initialize current month's data if not exists
    usageData[currentMonth] = (usageData[currentMonth] || 0) + 1;

    // Check usage limit
    if (usageData[currentMonth] > maxMonthlyUses) {
        return false; // Limit exceeded
    }

    // Save updated usage
    Cookies.set(`monthly-${feature}-Usage`, JSON.stringify(usageData), {
        expires: 30,
        path: '/'
    });

    return true; // Usage allowed
};