import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const endpoint =
    process.env.NODE_ENV === "development"
        ? "https://www.pdfequips.com"
        : "";


interface UserInfo {
    id: string;
    username: string;
    email: string;
    googleId?: string;
    facebookId?: string;
    profilePicture: string;
    emailVerified: boolean;
    paddleCustomerId?: string | null;
    createdAt: string;
    updatedAt: string;
}

interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

interface SubscriptionResponse {
    success: boolean;
    data?: {
        status: string;
        // Add other subscription fields as needed
    };
}


export async function fetchSubscriptionStatus(): Promise<boolean> {
    try {
        // Check userInfo cookie
        const userInfoStr = Cookies.get('userInfo');
        if (userInfoStr) {
            const userInfo: UserInfo = JSON.parse(decodeURIComponent(userInfoStr));
            const response = await axios.get<SubscriptionResponse>(`${endpoint}/subscription/${userInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }

        // Fallback to userToken if userInfo is not available
        const userToken = Cookies.get('userToken');
        if (userToken) {
            const decodedToken = jwtDecode<JwtPayload>(userToken);
            const response = await axios.get(`${endpoint}/subscription/${decodedToken.id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });
            return response.data.success && response.data.data?.status === 'active';
        }

        // Default to non-premium if no valid cookies found
        return false;
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        return false;
    }
}
