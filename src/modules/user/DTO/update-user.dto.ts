import { z } from "zod";

export const updateUserDTO = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    address: z.string().optional(),
    phone_number: z.string().optional(),
    role: z.enum(["admin", "student", "teacher"]),
    dob: z.string().optional(),
  })
  .optional();

export type updateUserDTO = z.infer<typeof updateUserDTO>;
