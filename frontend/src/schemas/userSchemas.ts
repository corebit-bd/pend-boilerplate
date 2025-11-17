import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name must be less than 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(50, "Last Name must be less than 50 characters")
    .optional(),
  email: z.string().pipe(z.email("Invalid Email Address")).optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please Confirm Your Password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const phoneSchema = z
  .string()
  .regex(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits");

export const urlSchema = z.url("Invalid URL Format");

export const uuidSchema = z.uuid("Invalid UUID Format");

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
