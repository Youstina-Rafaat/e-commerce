import Link from "next/link";
import { LuHouse, LuShoppingCart, LuSprout } from "react-icons/lu";
import GoBackButton from "@/app/-components/GoBackButton/GoBackButton";

const destinations = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Today's Deals", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative mx-auto container overflow-hidden px-4 py-16">
      {/* decorative sprouts */}
      <LuSprout className="absolute start-10 top-16 hidden h-10 w-10 text-green-200 md:block" />
      <LuSprout className="absolute end-10 top-1/3 hidden h-12 w-12 text-green-300 md:block" />

      <div className="mx-auto max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-3xl bg-green-50">
          <LuShoppingCart className="h-24 w-24 -translate-y-3 text-green-600" />
          <span className="absolute -end-8 -top-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white shadow-lg">
            404
          </span>
          <div className="absolute bottom-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
            <span className="h-3 w-6 rounded-b-full border-b-2 border-green-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
          </div>
        </div>

        <h1 className="mt-10 text-5xl font-extrabold text-gray-800">
          Oops! Nothing Here
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-gray-600">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-green-600/30 transition hover:bg-green-700"
          >
            <LuHouse className="h-5 w-5" />
            Go to Homepage
          </Link>
          <GoBackButton />
        </div>

        {/* Popular destinations */}
        <div className="mx-auto mt-12 rounded-3xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Popular Destinations
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {destinations.map((d, i) => (
              <Link
                key={d.label}
                href={d.href}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  i === 0
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}