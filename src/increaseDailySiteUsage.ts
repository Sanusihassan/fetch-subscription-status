import Cookies from "js-cookie";
/**
 * Increases the daily site usage count by a given amount (default = 1).
 * Uses the same "dailySiteUsage" cookie structure as canUseSiteToday().
 *
 * @param amount - How much to increase today's usage by (default 1)
 * @returns The updated usage count for today
 */
export const increaseDailySiteUsage = (amount: number = 1): number => {
    const today = new Date().toISOString().split("T")[0];

    // Read existing usage object
    const usageData = JSON.parse(Cookies.get("dailySiteUsage") || "{}") as Record<
        string,
        number
    >;

    // Increment today's count
    usageData[today] = (usageData[today] || 0) + amount;

    // Save updated usage
    Cookies.set("dailySiteUsage", JSON.stringify(usageData), {
        expires: 1, // expires in 1 day
        path: "/",
    });

    return usageData[today];
};
