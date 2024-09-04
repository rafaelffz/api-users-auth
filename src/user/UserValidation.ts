import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
});
