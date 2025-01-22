import { z } from "zod";

export const createChatSchema = z.object({
  chatName: z.string().nonempty("Name is required"),
  phoneNumberContact: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number cannot exceed 10 digits" }),
});


export type CreateChatSchema = z.infer<typeof createChatSchema>;