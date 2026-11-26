"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/actions/forgetPassword.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "@/schemas/forgetPassword.schema";
import PasswordInput from "../PasswordInput/PasswordInput";

export default function ResetStep({ email }: { email: string }) {
  const router = useRouter();
  const form = useForm<resetPasswordSchemaType>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function handleReset(data: resetPasswordSchemaType) {
    const res = await resetPassword(email, data.newPassword);
    if (res.ok) {
      toast.add({
        type: "success",
        description: "Password changed, please sign in",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.add({
        type: "error",
        description: res.message ?? "Cannot reset the password right now",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleReset)} className="flex flex-col gap-5">
      <Controller
        name="newPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter new password"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Confirm new password"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer bg-green-600 text-base text-white hover:bg-green-700"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
