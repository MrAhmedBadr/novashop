import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  line1: z.string().min(4, "Enter your street address"),
  line2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Enter your state/region"),
  postalCode: z.string().min(3, "Enter your postal code"),
  country: z.string().min(2, "Select a country"),
});

export const paymentSchema = z.object({
  cardName: z.string().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .refine((v) => v.replace(/\s/g, "").length >= 15, "Enter a valid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, "MM / YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3–4 digits"),
});

export const checkoutSchema = addressSchema.merge(paymentSchema).extend({
  saveAddress: z.boolean().optional(),
  shippingMethod: z.enum(["standard", "express"]),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;
export type AddressForm = z.infer<typeof addressSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
