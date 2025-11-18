import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email Addressis required")
    .pipe(z.email("Invalid Email Address")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email Addressis required")
      .pipe(z.email("Invalid Email Address")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please Confirm Your Password"),
    firstName: z
      .string()
      .min(1, "First Name is required")
      .max(50, "First Name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .max(50, "Last Name must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
