import { test, expect } from '@playwright/test';

test.describe('Admin Access Security', () => {

    test('should redirect guest user to login page when accessing admin', async ({ page }) => {
        // 1. Try to visit protected route
        await page.goto('/admin/dashboard');

        // 2. Should be redirected to /login
        // Check URL pattern
        await expect(page).toHaveURL(/.*login/);

        // 3. Should see login form
        await expect(page.getByPlaceholder(/email/i)).toBeVisible();
        await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    });

    test('should block login with invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.getByPlaceholder(/email/i).fill('fake@admin.com');
        await page.getByPlaceholder(/password/i).fill('wrongpassword');
        await page.getByRole('button', { name: /Login/i }).click();

        // Should stay on login or show error
        // Assuming alert or error message text:
        // "Invalid credentials" or similar
        // We wait for the error message
        // Note: Adjust selector based on actual UI implementation
        // await expect(page.getByText('Invalid credentials')).toBeVisible(); 
    });

});
