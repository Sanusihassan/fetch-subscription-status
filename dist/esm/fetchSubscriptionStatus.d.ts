export declare function fetchSubscriptionStatus(): Promise<boolean>;
export declare enum SubscriptionPlan {
    MONTHLY = "monthly",
    YEARLY = "yearly",
    TRIAL = "trial"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    INACTIVE = "inactivate",
    CANCELED = "canceled",
    EXPIRED = "expired",
    PAST_DUE = "past_due",
    PAUSED = "paused",
    TRIALING = "trialing",
    PROCESSING = "processing",
    PENDING = "pending",
    PAYMENT_FAILED = "payment_failed"
}
interface SubscriptionData {
    id: string;
    userId: string;
    paddleSubscriptionId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    canceledAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
interface UserSubscription {
    isActive: boolean;
    subscription: SubscriptionData | null;
}
export declare function getUserSubscription(): Promise<UserSubscription>;
export {};
