import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const endpoint = process.env.NODE_ENV === "development"
    ? "https://refactored-space-couscous-r65x9p4pxqghw7gv-3000.app.github.dev/"
    : "";
export async function fetchSubscriptionStatus() {
    try {
        // Check userInfo cookie
        const userInfoStr = Cookies.get('userInfo');
        if (userInfoStr) {
            const userInfo = JSON.parse(decodeURIComponent(userInfoStr));
            const response = await axios.get(`${endpoint}/subscription/${userInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }
        // Fallback to userToken if userInfo is not available
        const userToken = Cookies.get('userToken');
        if (userToken) {
            const decodedToken = jwtDecode(userToken);
            const response = await axios.get(`${endpoint}/subscription/${decodedToken.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }
        // Default to non-premium if no valid cookies found
        return false;
    }
    catch (error) {
        console.error('Error fetching subscription status:', error);
        return false;
    }
}
