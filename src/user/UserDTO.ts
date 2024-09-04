import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export type userDTO = z.infer<typeof userSchema>;
