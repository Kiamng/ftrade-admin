import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const CheckEmailSchema = z.object({
  email: z.string().email()
});

export const AddModerSchema = z.object({
  fullname: z.string().min(4, 'Fullname needs a minimum length of 4'),
  username: z.string().min(4, 'Username needs a minimum length of 4'),
  email: z.string().email('This field is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password needs a minimum length of 6')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    ),
  phoneNumber: z.string().refine((val) => /^0\d{9}$/.test(val), {
    message: 'Phone number must start with 0 and have exactly 10 digits'
  })
});

const ReviewSectionSchema = z.object({
  action: z.enum(['Approve', 'Deny']),
  denyReason: z.string().optional(),
}).refine(data => data.action === 'Approve' || (data.action === 'Deny' && data.denyReason), {
  message: 'You must provide a reason if you deny',
  path: ['denyReason'],
});

export default ReviewSectionSchema;

