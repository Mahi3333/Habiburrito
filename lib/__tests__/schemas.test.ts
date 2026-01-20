import { describe, it, expect } from 'vitest';
import { contactSchema, loginSchema } from '../schemas';

describe('Validation Schemas', () => {

    describe('contactSchema', () => {
        it('should validate a correct contact', () => {
            const valid = {
                name: "John Doe",
                email: "john@example.com",
                phone: "+15551234567"
            };
            const result = contactSchema.safeParse(valid);
            expect(result.success).toBe(true);
        });

        it('should reject invalid email', () => {
            const invalid = {
                name: "John Doe",
                email: "not-an-email",
                phone: "1234567890"
            };
            const result = contactSchema.safeParse(invalid);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].path).toContain('email');
            }
        });

        it('should reject short names', () => {
            const invalid = {
                name: "J",
                email: "john@example.com",
                phone: "1234567890"
            };
            const result = contactSchema.safeParse(invalid);
            expect(result.success).toBe(false);
        });
    });

    describe('loginSchema', () => {
        it('should accept valid credentials', () => {
            const valid = { email: "admin@habitburrito.com", password: "securePassword123" };
            const result = loginSchema.safeParse(valid);
            expect(result.success).toBe(true);
        });

        it('should reject short passwords', () => {
            const invalid = { email: "admin@habitburrito.com", password: "123" };
            const result = loginSchema.safeParse(invalid);
            expect(result.success).toBe(false);
        });
    });
});
