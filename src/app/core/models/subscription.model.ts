import { Product } from './product.model';

export type SubscriptionPlanType = 'daily' | 'weekly' | 'monthly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface SubscriptionPlan {
    id: string;
    name: string;
    type: SubscriptionPlanType;
    price: number;
    description: string;
    features: string[];
}

export interface SubscriptionBoxItem {
    day: string; // e.g., 'Monday', 'Tuesday'
    product: Product;
}

export interface Subscription {
    id: string;
    userId: string;
    planId: string;
    startDate: Date;
    status: SubscriptionStatus;
    boxItems: SubscriptionBoxItem[];
    nextDeliveryDate: Date;
}
