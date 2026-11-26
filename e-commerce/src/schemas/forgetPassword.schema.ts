import * as zod from "zod";

export const emailSchema = zod.object({
  email: zod.email("invalid email").nonempty("email is required"),
});
export type emailSchemaType = zod.infer<typeof emailSchema>;

export const codeSchema = zod.object({
  resetCode: zod.string().regex(/^\d{6}$/, "code must be 6 digits"),
});
export type codeSchemaType = zod.infer<typeof codeSchema>;

export const resetPasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. @, #, !, $).",
      ),
    confirmPassword: zod.string().nonempty("confirm password is required"),
  })
  .refine((o) => o.newPassword === o.confirmPassword, {
    error: "passwords do not match",
    path: ["confirmPassword"],
  });
export type resetPasswordSchemaType = zod.infer<typeof resetPasswordSchema>;