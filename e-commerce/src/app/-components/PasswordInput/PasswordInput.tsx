"use client";

import { useState, type ComponentProps } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { Input } from "@/components/ui/input";

type PasswordInputProps = ComponentProps<"input"> & {
  hideIcon?: boolean; 
};

export default function PasswordInput({
  hideIcon = false,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      {!hideIcon && (
        <LuLock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      )}
      <Input
        {...props}
        type={show ? "text" : "password"}
        className={`h-11 pe-10 ${hideIcon ? "" : "ps-10"}`}
      />
      <button
        type="button"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
        className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
      >
        {show ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
      </button>
    </div>
  );
}