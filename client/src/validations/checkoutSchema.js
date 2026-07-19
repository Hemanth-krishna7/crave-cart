import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  addressLine: z
    .string()
    .min(1, 'Address is required')
    .trim(),
  city: z
    .string()
    .min(1, 'City is required')
    .trim(),
  state: z
    .string()
    .min(1, 'State is required')
    .trim(),
  pincode: z
    .string()
    .min(1, 'Pincode is required')
    .regex(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  instructions: z
    .string()
    .optional()
    .or(z.literal('')),
  paymentMethod: z
    .enum(['cod', 'upi', 'card']),
});
