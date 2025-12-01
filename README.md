# Habiburrito E-Commerce Ordering System 🌯

## Project Overview
Habiburrito is a premium, modern web application designed for a "Build Your Own" halal meal restaurant. Inspired by the Chipotle ordering experience, this application allows customers to customize their bowls, burritos, and salads with fresh ingredients, while providing a seamless and secure checkout process. Built with performance and aesthetics in mind, it features a high-end dark-mode design, glassmorphism UI elements, and a robust backend for order management.

## Key Features
*   **Build Your Own Meal**: Interactive, step-by-step builder for customizing burritos, bowls, and salads.
*   **Secure Stripe Checkout**: Integrated payment processing using Stripe Payment Intents for secure transactions.
*   **Admin Dashboard**: Protected interface for restaurant staff to view and manage incoming orders in real-time.
*   **Responsive Premium Design**: Fully responsive layout with a "dark mode" aesthetic, animations, and mobile-friendly navigation.
*   **Menu Showcase**: Static menu pages highlighting signature items with high-quality imagery.
*   **Order Tracking**: Users receive immediate confirmation and order details upon successful payment.

## Technology Stack
*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Frontend**: React, TypeScript, Tailwind CSS (with custom configuration)
*   **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
*   **Payments**: [Stripe SDK](https://stripe.com/docs/js)
*   **Authentication**: Custom JWT-based auth for Admin Dashboard
*   **Deployment**: Vercel (recommended)

## Local Setup Guide

Follow these steps to set up the project locally for development:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd habiburrito-app
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    # Database Connection (Prisma Accelerate & Direct Connection)
    DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/..."
    DIRECT_URL="postgres://..."

    # Stripe Payments (Test Mode Keys)
    STRIPE_SECRET_KEY="sk_test_..."
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

    # Admin Authentication
    JWT_SECRET="your-super-secret-key"
    ```

4.  **Initialize the Database**
    Run the following commands to push the schema and seed initial data:
    ```bash
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    ```

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment & Data Setup

After deploying to a production environment (like Vercel), you must perform the following one-time setup steps to ensure the database is ready:

1.  **Migrate the Database**
    Apply the schema to your production database:
    ```bash
    npx prisma migrate deploy
    # OR if using Prisma Accelerate/Push workflow
    npx prisma db push
    ```

2.  **Seed Initial Data**
    Populate the database with menu items and modifiers:
    ```bash
    npx prisma db seed
    ```

3.  **Create Admin User**
    Create the initial administrator account for the dashboard:
    ```bash
    npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/create-admin.ts admin <your-secure-password>
    ```
    *Replace `<your-secure-password>` with a strong password.*

## Project Structure
*   `/app`: Next.js App Router pages and API routes.
*   `/components`: Reusable UI components (Header, Footer, ModifierCard).
*   `/context`: Global state management (CartContext).
*   `/prisma`: Database schema, seed scripts, and admin creation utilities.
*   `/public`: Static assets (images, logos).
