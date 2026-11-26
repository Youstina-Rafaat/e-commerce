import Link from "next/link";
import { LuArrowRight, LuPackage } from "react-icons/lu";

const categories = ["Electronics", "Fashion", "Home", "Beauty"];

export default function EmptyCart() {
  return (
    <div className="mx-auto mt-12 max-w-2xl py-8 text-center">
      <span className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <LuPackage className="h-14 w-14" />
      </span>

      <h2 className="mt-10 text-3xl font-bold text-gray-900">Your cart is empty</h2>
      <p className="mx-auto mt-4 max-w-md text-lg text-gray-500">
        Looks like you haven&apos;t added anything to your cart yet. Start
        exploring our products!
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-10 py-4 font-semibold text-white shadow-lg shadow-green-600/30 transition hover:bg-green-700"
      >
        Start Shopping
        <LuArrowRight className="h-5 w-5" />
      </Link>

      <div className="mt-14">
        <p className="text-sm text-gray-400">Popular Categories</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {categories.map((name) => (
            <Link
              key={name}
              href="/categories"
              className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}