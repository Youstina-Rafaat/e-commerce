"use client";

import { useState } from "react";
import Link from "next/link";
import { LuZap } from "react-icons/lu";
import QuantityCounter from "@/app/-components/QuantityCounter/QuantityCounter";
import AddBtn from "@/app/-components/AddBtn/AddBtn";
import { Props } from "@/api/types/productPurchase.type";



export default function ProductPurchase({ id, finalPrice, available }: Props) {
  const [qty, setQty] = useState(1);

  return (
    <>
      <p className="mb-2 mt-6 text-sm font-medium text-gray-600">Quantity</p>
      <div className="flex items-center gap-4">
        <QuantityCounter
          value={qty}
          max={available}
          onDecrease={() => setQty((q) => q - 1)}
          onIncrease={() => setQty((q) => q + 1)}
        />
        <span className="text-sm text-gray-500">{available} available</span>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-5 py-4">
        <span className="font-medium text-gray-600">Total Price:</span>
        <span className="text-xl font-bold text-green-600">
          {(finalPrice * qty).toFixed(2)} EGP
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AddBtn
          id={id}
          count={qty}
          word="Add to Cart"
          styles="w-full rounded-lg bg-green-600 p-6 font-medium text-white cursor-pointer hover:bg-green-700"
        />
        <Link
          href="/cart"
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-700 p-3 font-medium text-white transition hover:bg-slate-800"
        >
          <LuZap className="h-4 w-4" />
          Buy Now
        </Link>
      </div>
    </>
  );
}