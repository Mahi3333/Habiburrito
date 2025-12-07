# Stripe Integration Guide for HabiBurrito

Based on your screenshot and our custom "dark and moody" design, here is the complete guide to integrating Stripe.

## 1. Choose Your Integration Type
In the screen you showed ("How do you want to accept payments?"), select **Embedded components**.

*   **Why?** This allows us to use **Stripe Elements** (`<PaymentElement />`), which we have already built into your `CheckoutPage`.
*   **Benefit:** It keeps the user on your website (instead of redirecting them to a generic Stripe page) and allows us to style the form to match your premium black/gold theme perfectly.

## 2. Get Your API Keys
To make the checkout work, you need to connect your Stripe account to the code.

1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Make sure you are in **Test Mode** (toggle the "Test mode" switch in the top right).
3.  Go to **Developers** > **API keys**.
4.  You will see two keys:
    *   **Publishable key:** Starts with `pk_test_...`
    *   **Secret key:** Starts with `sk_test_...`

## 3. Configure Your Environment
You need to add these keys to your project's environment variables.

1.  Open the file named `.env.local` in your project root (create it if it doesn't exist).
2.  Add the following lines, replacing the values with your actual keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**Important:** Restart your development server (`npm run dev`) after changing the `.env.local` file.

## 4. Testing Payments
Once your keys are set up, you can test the checkout flow:

1.  Add items to your cart.
2.  Go to the Checkout page.
3.  Fill in the Contact Information (Name, Email, Phone).
4.  In the Payment Details section, use one of Stripe's [Test Card Numbers](https://stripe.com/docs/testing):
    *   **Card Number:** `4242 4242 4242 4242`
    *   **Expiry:** Any future date (e.g., `12/34`)
    *   **CVC:** Any 3 digits (e.g., `123`)
    *   **ZIP:** Any valid ZIP code (e.g., `12345`)

## 5. Next Steps (For Production)
When you are ready to go live (accept real money):
1.  Toggle "Test mode" **OFF** in Stripe.
2.  Get your **Live** API keys (`pk_live_...` and `sk_live_...`).
3.  Update your environment variables on your hosting platform (e.g., Vercel) with the live keys.
4.  **Webhooks:** Set up Stripe Webhooks to listen for `payment_intent.succeeded` events to handle post-payment actions (like sending confirmation emails or updating inventory) securely.
