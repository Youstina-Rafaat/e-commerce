"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
    >
      <LuArrowLeft className="h-5 w-5" />
      Go Back
    </button>
  );
}