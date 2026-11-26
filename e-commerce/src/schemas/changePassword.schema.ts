import * as zod from "zod";

export const changePasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty("current password is required"),
    password: zod
      .string()
      .nonempty("new password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. @, #, !, $).",
      ),
    rePassword: zod.string().nonempty("confirm password is required"),
  })
  .refine((o) => o.password === o.rePassword, {
    error: "passwords do not match",
    path: ["rePassword"],
  })
  .refine((o) => o.password !== o.currentPassword, {
    error: "new password must be different from the current one",
    path: ["password"],
  });

export type changePasswordSchemaType = zod.infer<typeof changePasswordSchema>;