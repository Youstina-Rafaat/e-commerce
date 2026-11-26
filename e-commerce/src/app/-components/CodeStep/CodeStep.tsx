"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft, LuShieldCheck } from "react-icons/lu";
import { sendResetCode, verifyResetCode } from "@/actions/forgetPassword.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { codeSchema, codeSchemaType } from "@/schemas/forgetPassword.schema";

export default function CodeStep({
  email,
  onSuccess,
  onChangeEmail,
}: {
  email: string;
  onSuccess: () => void;
  onChangeEmail: () => void;
}) {
  const form = useForm<codeSchemaType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(codeSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function handleVerify(data: codeSchemaType) {
    const res = await verifyResetCode(data.resetCode);
    if (res.ok) {
      toast.add({ type: "success", description: "Code verified" });
      onSuccess();
    } else {
      toast.add({
        type: "error",
        description: res.message ?? "Invalid or expired code",
      });
    }
  }

  async function handleResend() {
    const res = await sendResetCode(email);
    toast.add({
      type: res.ok ? "success" : "error",
      description: res.ok
        ? "A new code was sent to your email"
        : (res.message ?? "Cannot resend the code right now"),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleVerify)} className="flex flex-col gap-5">
        <Controller
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
              <div className="relative">
                <LuShieldCheck className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••"
                  autoComplete="one-time-code"
                  className="h-11 ps-10 text-center text-lg tracking-[0.5em]"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <p className="text-center text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="cursor-pointer font-medium text-green-600 hover:underline"
          >
            Resend Code
          </button>
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer bg-green-600 text-base text-white hover:bg-green-700"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>
      </form>

      <button
        type="button"
        onClick={onChangeEmail}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-600"
      >
        <LuArrowLeft className="h-4 w-4" />
        Change email address
      </button>
    </>
  );
}