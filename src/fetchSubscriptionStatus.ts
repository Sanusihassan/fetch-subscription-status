// fetchSubscriptionStatus.ts - SECURE VERSION
import axios from 'axios';

const endpoint =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"  // Your auth API endpoint
        : "";  // Production endpoint

export enum SubscriptionPlan {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    MONTHLY_PRO = 'monthly_pro',
    YEARLY_PRO = 'yearly_pro',
    TRIAL = 'trial'
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
    PAST_DUE = 'past_due',
    PAUSED = 'paused',
    TRIALING = 'trialing',
    PROCESSING = 'processing',
    PENDING = 'pending',
    PAYMENT_FAILED = 'payment_failed',
}

export interface SubscriptionData {
    id: string;
    userId: string;
    paddleSubscriptionId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    canceledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

interface SubscriptionResponse {
    success: boolean;
    data?: SubscriptionData;
    error?: string;
}

export interface UserSubscription {
    isActive: boolean;
    subscription: SubscriptionData | null;
}

// ✅ SECURE: Simple function that relies on backend verification
export async function fetchSubscriptionStatus(): Promise<boolean> {
    try {
        const response = await axios.get<SubscriptionResponse>(
            `${endpoint}/subscription`,  // ✅ No userId in URL!
            {
                withCredentials: true  // ✅ Sends httpOnly cookies automatically
            }
        );

        return response.data.success && response.data.data?.status === 'active';
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 404 means no subscription, not an error
            if (error.response?.status === 404) {
                return false;
            }
            // 401 means not authenticated
            if (error.response?.status === 401) {
                console.log('User not authenticated');
                return false;
            }
        }
        console.error('Error fetching subscription status:', error);
        return false;
    }
}

// ✅ SECURE: Get full subscription details
export async function getUserSubscription(): Promise<UserSubscription> {
    try {
        const response = await axios.get<SubscriptionResponse>(
            `${endpoint}/subscription`,  // ✅ No userId in URL!
            {
                withCredentials: true  // ✅ Sends httpOnly cookies automatically
            }
        );

        if (response.data.success && response.data.data) {
            return {
                isActive: response.data.data.status === 'active',
                subscription: response.data.data
            };
        }

        return {
            isActive: false,
            subscription: null
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return {
                    isActive: false,
                    subscription: null
                };
            }
            if (error.response?.status === 401) {
                console.log('User not authenticated');
                return {
                    isActive: false,
                    subscription: null
                };
            }
        }
        console.error('Error fetching subscription:', error);
        return {
            isActive: false,
            subscription: null
        };
    }
}