import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16'
});

// Mock data for revenue overview (used when Stripe key is not provided)
export const getMockRevenueData = () => {
  return {
    totalRevenue: 12500,
    newSubscriptions: 15,
    churn: 3
  };
};
