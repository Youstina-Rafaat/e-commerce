import { Props } from "@/api/types/orderSummary.type";
import Link from "next/link";
import {
  LuArrowLeft,
  LuCheck,
  LuLock,
  LuShieldCheck,
  LuShoppingBag,
  LuTag,
  LuTruck,
  LuUser,
} from "react-icons/lu";



const FREE_SHIPPING_FROM = 500;

export default function OrderSummary({ itemsCount, total, isLoggedIn ,cartId }: Props) {
  const formatted = total.toLocaleString("en-US");
  const freeShipping = total >= FREE_SHIPPING_FROM;

  if (isLoggedIn) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:sticky lg:top-24">
        <div className="bg-green-600 px-6 py-5 text-white">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <LuShoppingBag className="h-5 w-5" />
            Order Summary
          </h2>
          <p className="mt-1 text-sm text-green-50">{itemsCount} items in your cart</p>
        </div>

        <div className="p-6">
          {freeShipping && (
            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <LuTruck className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-semibold text-green-700">Free Shipping!</p>
                <p className="text-sm text-green-600">You qualify for free delivery</p>
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-800">{formatted} EGP</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-gray-600">
            <span>Shipping</span>
            {freeShipping ? (
              <span className="font-semibold text-green-600">FREE</span>
            ) : (
              <span className="text-sm font-medium text-green-600">
                Calculated at checkout
              </span>
            )}
          </div>

          <hr className="my-5 border-dashed border-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-3xl font-bold text-gray-800">
              {formatted}{" "}
              <span className="text-sm font-normal text-gray-500">EGP</span>
            </span>
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-gray-600 transition hover:border-green-600 hover:text-green-600"
          >
            <LuTag className="h-4 w-4" />
            Apply Promo Code
          </button>

          <Link
          href={`/checkout/${cartId}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <LuLock className="h-4 w-4" />
            Secure Checkout
          </Link>

          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <LuShieldCheck className="h-4 w-4 text-green-600" />
              Secure Payment
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <LuTruck className="h-4 w-4 text-blue-500" />
              Fast Delivery
            </span>
          </div>

          <Link
            href="/shop"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700"
          >
            <LuArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:sticky lg:top-24">
      <div className="bg-slate-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Order Summary</h2>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal ({itemsCount} items)</span>
          <span className="font-medium text-gray-800">{formatted} EGP</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-sm font-medium text-green-600">
            Calculated at checkout
          </span>
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Estimated Total</span>
          <span className="text-xl font-bold text-green-600">{formatted} EGP</span>
        </div>

        <Link
          href="/signin"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700"
        >
          <LuUser className="h-4 w-4" />
          Login to Checkout
        </Link>

        <p className="mt-3 text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-green-600 hover:underline">
            Sign up
          </Link>
        </p>

        <ul className="mt-5 flex flex-col gap-2 text-xs text-gray-500">
          {[
            "Your cart items will be saved",
            "Track your orders easily",
            "Access exclusive member deals",
          ].map((text) => (
            <li key={text} className="flex items-center gap-2">
              <LuCheck className="h-3.5 w-3.5 text-green-600" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}