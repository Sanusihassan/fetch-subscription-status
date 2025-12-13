// ✅ SECURE FRONTEND
// getUserInfo.ts

import Cookies from 'js-cookie';
import axios from 'axios';

const endpoint =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "";

export interface UserInfo {
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

interface UserResponse {
    success: boolean;
    data?: UserInfo;
    error?: string;
}

/**
 * Retrieves the currently signed-in user's information.
 * ✅ SECURE VERSION: Uses httpOnly cookie, no userId extraction
 * @returns A Promise resolving to UserInfo if the user is signed in, or null if not.
 */
export async function getUserInfo(): Promise<UserInfo | null> {
    try {
        // Step 1: Try userInfo cookie first (faster, no API call needed)
        const userInfoStr = Cookies.get('userInfo');
        if (userInfoStr) {
            try {
                const userInfo: UserInfo = JSON.parse(decodeURIComponent(userInfoStr));
                return userInfo;
            } catch (parseError) {
                console.error('Error parsing userInfo cookie:', parseError);
                // Fall through to API call
            }
        }

        // Step 2: Fallback to API call using httpOnly userToken cookie
        // ✅ SECURE: No userId, no API_SECRET_KEY - just withCredentials
        const response = await axios.get<UserResponse>(
            `${endpoint}/auth/user`,  // ✅ No userId in URL!
            {
                withCredentials: true  // ✅ Sends httpOnly cookie automatically
            }
        );

        if (response.data.success && response.data.data) {
            return response.data.data;
        }

        return null;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 401 means not authenticated - this is normal, not an error
            if (error.response?.status === 401) {
                return null;
            }
            // 404 means user not found
            if (error.response?.status === 404) {
                console.warn('User not found');
                return null;
            }
        }
        console.error('Error getting user info:', error);
        return null;
    }
}