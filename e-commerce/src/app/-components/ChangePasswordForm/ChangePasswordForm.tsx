"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLock } from "react-icons/lu";
import { changePassword } from "@/actions/changrPassword.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from "@/schemas/changePassword.schema";
import PasswordInput from "../PasswordInput/PasswordInput";

const fields = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
    hint: "",
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter your new password",
    hint: "Must be at least 8 characters with uppercase, lowercase, a number and a symbol",
  },
  {
    name: "rePassword",
    label: "Confirm New Password",
    placeholder: "Confirm your new password",
    hint: "",
  },
] as const;

export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm<changePasswordSchemaType>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  async function handleChange(data: changePasswordSchemaType) {
    const res = await changePassword(data);
    if (res.ok) {
      toast.add({
        type: "success",
        description: "Password changed, please sign in again",
      });
      reset();
      setTimeout(async () => {
        await signOut({ redirect: false });
        router.push("/login");
      }, 2000);
    } else {
      toast.add({
        type: "error",
        description: res.message ?? "Cannot change the password right now",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleChange)} className="flex flex-col gap-5">
      {fields.map((f) => (
        <Controller
          key={f.name}
          name={f.name}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{f.label}</FieldLabel>
              <PasswordInput
                {...field}
                hideIcon
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={f.placeholder}
                autoComplete="off"
              />
              {f.hint && <p className="text-xs text-gray-500">{f.hint}</p>}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-fit cursor-pointer gap-2 bg-orange-600 px-6 text-white hover:bg-orange-700"
      >
        <LuLock className="h-4 w-4" />
        {isSubmitting ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
}