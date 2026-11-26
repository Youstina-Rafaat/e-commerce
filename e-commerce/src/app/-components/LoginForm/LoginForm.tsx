"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { loginSchema, loginSchemaType } from "@/schemas/auth.schema";
import PasswordInput from "../PasswordInput/PasswordInput";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function handleLogin(data: loginSchemaType) {
    console.log(data);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok) {
      toast.add({
        type: "success",
        description: "welcome back",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.add({
        type: "error",
        description: res?.error,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
            <div className="relative">
              <LuMail className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
                className="h-11 ps-10"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Link
                href="/forget-password"
                className="text-sm font-medium text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="h-4 w-4 accent-green-600" />
        Keep me signed in
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer bg-green-600 text-base text-white hover:bg-green-700"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}