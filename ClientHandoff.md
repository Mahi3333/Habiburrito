# Client Handoff Documentation

## I. Admin Dashboard Guide

The Admin Dashboard is your command center for managing incoming orders.

### 1. Accessing the Dashboard
*   **URL**: Navigate to `/admin/dashboard` (e.g., `https://your-domain.com/admin/dashboard`).
*   **Login**: Enter your secure username and password.
    *   *Note: If you lose your credentials, contact the developer to reset them via the database.*

### 2. Viewing Orders
*   The dashboard displays the **20 most recent orders**.
*   **Refresh**: Click the "Refresh Data" button to check for new orders manually.
*   **Columns**:
    *   **Order ID**: Unique identifier for the order.
    *   **Items**: A summary of the burritos/bowls in the order.
    *   **Total**: The final amount paid.
    *   **Status**: Current state of the order.

### 3. Managing Order Status
Use the dropdown menu in the "Actions" column to update the status of an order as it moves through your kitchen:
1.  **PAID**: The order has been received and payment confirmed. **Start cooking!**
2.  **IN PROGRESS**: The kitchen is currently preparing the food.
3.  **READY FOR PICKUP**: The order is bagged and ready for the customer.
4.  **COMPLETED**: The customer has picked up the order.

---

## II. Menu Update Protocol

The menu structure (prices, modifiers, and options) is strictly defined in the application code and database to ensure accurate billing.

**To make changes:**
*   **Contact the Developer**: Do not attempt to modify the database directly, as this may break the "Build Your Own" logic.
*   **Request Types**:
    *   **Price Changes**: E.g., increasing Steak price from $11.99 to $12.99.
    *   **New Items**: E.g., adding "Vegan Chorizo" to the Protein list.
    *   **Policy Changes**: E.g., changing the max number of free toppings.

*These changes require a code update and a database deployment.*

---

## III. Maintenance & Security Checklist

### 1. Security Secrets
*   **JWT_SECRET**: This key signs your login cookies. **Never share this key.** If you believe it has been compromised, contact the developer immediately to rotate it (this will log out all admins).
*   **STRIPE Keys**: Keep your Stripe Secret Key secure. It allows refunds and charges.

### 2. Database Backups
*   Ensure your database provider (e.g., Vercel Postgres, Supabase, Neon) has **daily backups** enabled.
*   This protects your order history and customer data in case of accidental data loss.

### 3. Regular Updates
*   The web application relies on third-party libraries (like Stripe and Next.js).
*   Schedule a **quarterly maintenance check** with your developer to update dependencies and ensure security patches are applied.
