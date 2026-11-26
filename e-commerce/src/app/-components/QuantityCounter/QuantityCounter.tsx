"use client";

import { Props } from "@/api/types/quantityCounter.type";
import { LuMinus, LuPlus } from "react-icons/lu";



export default function QuantityCounter({
  value,
  onIncrease,
  onDecrease,
  disabled = false,
  min = 1,
  max,
  size = "md",
}: Props) {
  const btn = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={onDecrease}
        className={`${btn} flex cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent`}
      >
        <LuMinus className="h-4 w-4" />
      </button>

      <span className="w-10 text-center font-medium text-gray-800">{value}</span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || (max !== undefined && value >= max)}
        onClick={onIncrease}
        className={`${btn} flex cursor-pointer items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300`}
      >
        <LuPlus className="h-4 w-4" />
      </button>
    </div>
  );
}