import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the API endpoint based on environment
const endpoint =
    process.env.NODE_ENV === "development"
        ? "https://refactored-space-couscous-r65x9p4pxqghw7gv-3000.app.github.dev/"
        : "";

// Interface for user information
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

// Interface for JWT payload
interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

/**
 * Retrieves the currently signed-in user's information.
 * @returns A Promise resolving to UserInfo if the user is signed in, or null if not.
 */
export async function getUserInfo(): Promise<UserInfo | null> {
    try {
        // Step 1: Check for 'userInfo' cookie
        const userInfoStr = Cookies.get('userInfo');
        if (userInfoStr) {
            // Parse the JSON string from the cookie and return it
            const userInfo: UserInfo = JSON.parse(decodeURIComponent(userInfoStr));
            return userInfo;
        }

        // Step 2: Fallback to 'userToken' cookie
        const userToken = Cookies.get('userToken');
        if (userToken) {
            // Decode the JWT to get user details
            const decodedToken = jwtDecode<JwtPayload>(userToken);

            // Check if the token has expired
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decodedToken.exp < currentTime) {
                // Token is expired, treat as no user signed in
                return null;
            }

            // Fetch user info from the server using the user ID
            const userId = decodedToken.id;
            const response = await axios.get<UserInfo>(`${endpoint}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            });

            // Return the fetched user info
            return response.data;
        }

        // Step 3: No valid cookies found, return null
        return null;
    } catch (error) {
        // Log any errors and return null
        console.error('Error getting user info:', error);
        return null;
    }
}