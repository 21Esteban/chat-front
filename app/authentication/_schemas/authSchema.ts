import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;