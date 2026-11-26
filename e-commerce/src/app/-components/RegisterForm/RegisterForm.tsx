"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuUserPlus } from "react-icons/lu";
import { userRegister } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { registerSchema, registerSchemaType } from "@/schemas/auth.schema";
import PasswordStrength from "../PasswordStrength/PasswordStrength";

export default function RegisterForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function handleRegister(data: registerSchemaType) {
    if (!agreed) {
      setTermsError(true);
      return;
    }
    console.log(data);
    const isRegistered = await userRegister(data);
    if (isRegistered) {
      toast.add({
        type: "success",
        description: "You Registered Successfully",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.add({
        type: "error",
        description: "cantnot Register right now !",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-5"
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
            <Input
              type="text"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ali"
              autoComplete="off"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
            <Input
              type="email"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="ali@example.com"
              autoComplete="off"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
            <Input
              type="password"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="create a strong password"
              autoComplete="off"
              className="h-11"
            />
            <PasswordStrength password={field.value} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirm Password*</FieldLabel>
            <Input
              type="password"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="confirm your password"
              autoComplete="off"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
            <Input
              type="tel"
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="01012345678"
              autoComplete="off"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (e.target.checked) setTermsError(false);
            }}
            className="h-4 w-4 accent-green-600"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-green-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
        {termsError && (
          <p className="mt-1 text-sm text-red-500">
            You must agree to the terms to continue
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer gap-2 bg-green-600 text-base text-white hover:bg-green-700"
      >
        <LuUserPlus className="h-5 w-5" />
        {isSubmitting ? "Creating account..." : "Create My Account"}
      </Button>
    </form>
  );
}