import { z } from 'zod';

// 1. Basic Field Validations
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164-ish or simple international
const nameRegex = /^[a-zA-Z\s\-\.']+$/;

// 2. Contact Information Schema
export const contactSchema = z.object({
    name: z.string()
        .min(2, "Name is too short (min 2 chars)")
        .max(100, "Name is too long (max 100 chars)")
        .regex(nameRegex, "Name contains invalid characters"),
    email: z.string()
        .email("Invalid email address")
        .max(255, "Email is too long"),
    phone: z.string()
        .min(10, "Phone number is too short")
        .max(20, "Phone number is too long")
        .regex(phoneRegex, "Invalid phone number format")
});

// 3. Order Item Schema
// Validate structure of a single cart item
export const orderItemSchema = z.object({
    uniqueId: z.string(),
    base: z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().min(0)
    }),
    protein: z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().min(0)
    }).optional().nullable(),
    rice: z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().min(0)
    }).optional().nullable(),
    toppings: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().min(0)
    })).optional(),
    sauces: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().min(0)
    })).optional(),
    quantity: z.number().int().positive().max(100, "Max quantity per item is 100"),
    totalPrice: z.number().min(0)
});

// 4. Create Order Request Schema
export const createOrderSchema = z.object({
    user: contactSchema,
    items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
    paymentIntentId: z.string().startsWith("pi_", "Invalid Payment Intent ID"),
    totalAmount: z.number().positive(),
    taxAmount: z.number().min(0)
});

// 5. Login/Auth Schemas
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters")
});

export const signupSchema = loginSchema.extend({
    name: z.string().min(2),
    phone: z.string().min(10).optional()
});
