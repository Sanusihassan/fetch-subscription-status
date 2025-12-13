export declare enum SubscriptionPlan {
    MONTHLY = "monthly",
    YEARLY = "yearly",
    MONTHLY_PRO = "monthly_pro",
    YEARLY_PRO = "yearly_pro",
    TRIAL = "trial"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    CANCELED = "canceled",
    EXPIRED = "expired",
    PAST_DUE = "past_due",
    PAUSED = "paused",
    TRIALING = "trialing",
    PROCESSING = "processing",
    PENDING = "pending",
    PAYMENT_FAILED = "payment_failed"
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
export interface UserSubscription {
    isActive: boolean;
    subscription: SubscriptionData | null;
}
export declare function fetchSubscriptionStatus(): Promise<boolean>;
export declare function getUserSubscription(): Promise<UserSubscription>;
