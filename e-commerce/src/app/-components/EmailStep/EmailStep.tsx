"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft, LuMail } from "react-icons/lu";
import { sendResetCode } from "@/actions/forgetPassword.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { emailSchema, emailSchemaType } from "@/schemas/forgetPassword.schema";

export default function EmailStep({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const form = useForm<emailSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function handleSend(data: emailSchemaType) {
    const res = await sendResetCode(data.email);
    if (res.ok) {
      toast.add({
        type: "success",
        description: "Reset code sent to your email",
      });
      onSuccess(data.email);
    } else {
      toast.add({
        type: "error",
        description: res.message ?? "Cannot send the code right now",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSend)} className="flex flex-col gap-5">
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
                  placeholder="Enter your email address"
                  autoComplete="off"
                  className="h-11 ps-10"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer bg-green-600 text-base text-white hover:bg-green-700"
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-600"
      >
        <LuArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      <p className="mt-10 text-center text-gray-600">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-green-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
