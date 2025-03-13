# Fitness App Admin Dashboard

A basic MVP admin dashboard for a fitness app built with Next.js 15, TypeScript, Tailwind CSS, DaisyUI, Supabase, and Clerk authentication.

## Features

- **Client Management**: View, sort, and filter clients
- **Plan Management**: Create and manage workout and nutrition plans
- **Revenue Overview**: Track total revenue, new subscriptions, and churn
- **Authentication**: Secure admin access with Clerk

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, DaisyUI
- **Backend**: Next.js API routes
- **Database**: Supabase
- **Authentication**: Clerk
- **Payment Processing**: Stripe (mock integration for MVP)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Clerk account
- Stripe account (optional for MVP)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd fitness-app-admin-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in your Clerk, Supabase, and Stripe credentials

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Supabase Setup

Create the following tables in your Supabase project:

1. **clients**:

   - id (uuid, primary key)
   - name (text)
   - email (text)
   - registration_date (date)
   - subscription_status (text: 'Active', 'Expired', 'Cancelled')
   - subscription_plan_id (text, optional)

2. **plans**:

   - id (uuid, primary key)
   - name (text)
   - type (text: 'Workout', 'Nutrition')
   - description (text, optional)

3. **client_plans** (for many-to-many relationship):
   - client_id (uuid, foreign key to clients.id)
   - plan_id (uuid, foreign key to plans.id)
   - Primary key: (client_id, plan_id)

### Clerk Setup

1. Create a Clerk application
2. Configure the sign-in and sign-up pages
3. Add your Clerk publishable key and secret key to `.env.local`

## Deployment

### Deploy to Vercel

```bash
vercel --prod
```

## License

[MIT](LICENSE)
