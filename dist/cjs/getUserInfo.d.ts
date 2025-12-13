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
/**
 * Retrieves the currently signed-in user's information.
 * ✅ SECURE VERSION: Uses httpOnly cookie, no userId extraction
 * @returns A Promise resolving to UserInfo if the user is signed in, or null if not.
 */
export declare function getUserInfo(): Promise<UserInfo | null>;
