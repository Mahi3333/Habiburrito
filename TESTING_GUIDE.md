# End-to-End (E2E) Testing Guide for HabiBurrito

This guide outlines the test scenarios to validate the full "Order & Checkout" flow.

## Prerequisites
*   Ensure the development server is running (`npm run dev`).
*   Ensure you are using the **Stripe Test Card**: `4242 4242 4242 4242` (Expiry: any future date, CVC: any 3 digits, ZIP: any 5 digits).

---

## Scenario 1: Happy Path (Standard Order)
**Goal:** Verify a user can build a custom item, add it to cart, and successfully pay.

1.  **Navigate to Home:** Go to `http://localhost:3000`.
2.  **Start Order:** Click "Craft Your Bowl" or "Order Now".
3.  **Build Item:**
    *   Select "Build Your Own Bowl".
    *   Choose a Base (e.g., Cilantro Lime Rice).
    *   Choose a Protein (e.g., Grilled Chicken).
    *   Add Toppings (e.g., Corn Salsa, Cheese).
    *   Click "Add to Order".
4.  **Verify Cart:**
    *   Ensure you are redirected to `/cart`.
    *   Verify the item details (Rice, Protein, Toppings) are correct.
    *   Verify the price is correct.
5.  **Checkout:**
    *   Click "Proceed to Checkout".
    *   Fill in Name: `Test User`, Email: `test@example.com`, Phone: `555-0100`.
    *   Wait for the Payment Form to load.
    *   Enter Test Card details.
    *   Click "Pay Now".
6.  **Success:**
    *   Verify you are redirected to `/order-confirmation`.
    *   Verify the "Order Confirmed!" message appears.
    *   **Database Check:** Check your database (`Order` table) to see if a new order was created with status `PENDING_PAYMENT` (or `PAID` if we implemented the webhook).

## Scenario 2: Empty Cart Handling
**Goal:** Verify a user cannot checkout with an empty cart.

1.  **Navigate to Cart:** Go to `http://localhost:3000/cart` (ensure it's empty).
2.  **Verify:** The "Proceed to Checkout" button should be disabled or hidden, OR clicking it shows a message.
3.  **Navigate to Checkout:** Manually go to `http://localhost:3000/checkout`.
4.  **Verify:** You should see a "Your cart is empty" message and no payment form.

## Scenario 3: Invalid Payment Details
**Goal:** Verify error handling for declined cards.

1.  **Add Item:** Add any item to the cart.
2.  **Go to Checkout:** Proceed to checkout.
3.  **Enter Invalid Card:** Use Stripe's "Card Declined" test card (e.g., `4000 0000 0000 0002`).
4.  **Click Pay:** Click "Pay Now".
5.  **Verify:**
    *   The spinner should stop.
    *   An error message "Your card was declined." (or similar) should appear in red.
    *   You should **NOT** be redirected to the confirmation page.

## Scenario 4: Form Validation
**Goal:** Verify contact details are required.

1.  **Add Item:** Add any item to the cart.
2.  **Go to Checkout:** Proceed to checkout.
3.  **Leave Fields Empty:** Do not fill in Name, Email, or Phone.
4.  **Click Pay:** Click "Pay Now".
5.  **Verify:**
    *   The browser should prompt you to fill in the required fields.
    *   The payment should not process.

## Scenario 5: Menu "Add to Cart"
**Goal:** Verify adding pre-set menu items works.

1.  **Navigate to Menu:** Go to `http://localhost:3000/menu`.
2.  **Add Item:** Click "Add to Order" on a specific item (e.g., "The Ember Steak").
3.  **Verify Toast:** A toast notification "Added The Ember Steak to order" should appear.
4.  **Check Cart:** Go to `/cart` and verify the item is there with the correct price.
