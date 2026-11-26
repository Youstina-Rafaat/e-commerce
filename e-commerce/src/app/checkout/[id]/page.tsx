"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast"
import {
  Banknote,
  CreditCard,
  Home,
  Info,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Building2,
  Check,
} from "lucide-react";

import { checkoutSchema, checkoutSchemaType } from "@/schemas/checkout.schema";
import { cashPayment } from "@/actions/checkout.action";
import { onlinePayment } from "@/actions/checkout.action";
import { getLoggedUserCart } from "@/actions/cart.action";
import { CartContext } from "@/context/CartContext";

export default function Checkout() {
  const { id } = useParams<{ id: string }>(); 
  const router = useRouter();
  const { setnumberOfCartItems } = useContext(CartContext);

  const [method, setMethod] = useState<"cash" | "online">("cash");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any>(null);

  const form = useForm<checkoutSchemaType>({
    defaultValues: { city: "", details: "", phone: "" },
    resolver: zodResolver(checkoutSchema),
  });
  const { handleSubmit, control } = form;

  useEffect(() => {
    (async () => {
      const res = await getLoggedUserCart();
      if (res.status === "success") setCart(res.data);
    })();
  }, []);

  async function mySubmit(data: checkoutSchemaType) {
    setLoading(true);
    try {
      if (method === "online") {
        const res = await onlinePayment(id, window.location.origin, data);
        if (res.status === "success") {
          window.location.href = res.session.url;
        } 
      } else {
        const res = await cashPayment(id, data);
        if (res.status === "success") {
          setnumberOfCartItems(0);
          router.push("/orders?success=true");
        } 
      }
    } catch (e: any) {
      return e
    } finally {
      setLoading(false);
    }
  }

  const products = cart?.products ?? [];
  const total = cart?.totalCartPrice ?? 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="mx-auto container px-4">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complete Your Order
              </h1>
              <p className="text-sm text-gray-500">
                Review your items and complete your purchase
              </p>
            </div>
          </div>
          <Link
            href="/cart"
            className="text-sm text-gray-500 hover:text-green-600"
          >
            ← Back to Cart
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(mySubmit)}
          className="grid gap-6 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <header className="flex items-center gap-3 bg-green-600 px-6 py-4 text-white">
                <Home size={20} />
                <div>
                  <h2 className="font-semibold">Shipping Address</h2>
                  <p className="text-xs text-green-100">
                    Where should we deliver your order?
                  </p>
                </div>
              </header>

              <div className="space-y-5 p-6">
                <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 text-sm">
                  <Info size={16} className="mt-0.5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Delivery Information
                    </p>
                    <p className="text-xs text-blue-600">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2
                          size={16}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <input
                          {...field}
                          id="city"
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          autoComplete="off"
                          aria-invalid={fieldState.invalid}
                          className="w-full rounded-lg border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 aria-[invalid=true]:border-red-400"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="details"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label
                        htmlFor="details"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <textarea
                          {...field}
                          id="details"
                          rows={3}
                          placeholder="Street name, building number, floor, apartment..."
                          aria-invalid={fieldState.invalid}
                          className="w-full resize-none rounded-lg border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 aria-[invalid=true]:border-red-400"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <input
                          {...field}
                          id="phone"
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          autoComplete="off"
                          aria-invalid={fieldState.invalid}
                          className="w-full rounded-lg border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 aria-[invalid=true]:border-red-400"
                        />
                      </div>
                      <p className="mt-1 text-right text-xs text-gray-400">
                        Egyptian numbers only
                      </p>
                      {fieldState.error && (
                        <p className="text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <header className="flex items-center gap-3 bg-green-600 px-6 py-4 text-white">
                <CreditCard size={20} />
                <div>
                  <h2 className="font-semibold">Payment Method</h2>
                  <p className="text-xs text-green-100">
                    Choose how you&apos;d like to pay
                  </p>
                </div>
              </header>

              <div className="space-y-3 p-6">
                <MethodCard
                  active={method === "cash"}
                  onClick={() => setMethod("cash")}
                  icon={<Banknote size={20} />}
                  title="Cash on Delivery"
                  desc="Pay when your order arrives at your doorstep"
                />
                <MethodCard
                  active={method === "online"}
                  onClick={() => setMethod("online")}
                  icon={<CreditCard size={20} />}
                  title="Pay Online"
                  desc="Secure payment with Credit/Debit Card via Stripe"
                  blue
                />

                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 text-sm">
                  <ShieldCheck size={18} className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-xs text-gray-500">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit overflow-hidden rounded-2xl border bg-white shadow-sm lg:sticky lg:top-24">
            <header className="bg-green-600 px-6 py-4 text-white">
              <h2 className="font-semibold">Order Summary</h2>
              <p className="text-xs text-green-100">{products.length} items</p>
            </header>

            <div className="p-5">
              <ul className="max-h-56 space-y-3 overflow-y-auto pr-1">
                {products.map((p: any) => (
                  <li
                    key={p._id}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-2"
                  >
                    <Image
                      src={p.product.imageCover}
                      alt={p.product.title}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {p.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {p.count} × {p.price} EGP
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      {p.count * p.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{total} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    {total}{" "}
                    <span className="text-xs font-normal text-gray-400">
                      EGP
                    </span>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !cart}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ShoppingBag size={18} />
                )}
                {method === "cash" ? "Place Order" : "Proceed to Payment"}
              </button>

              <div className="mt-3 flex justify-center gap-4 text-xs text-gray-400">
                <span>Secure</span>
                <span>Fast Delivery</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function MethodCard({
  active,
  onClick,
  icon,
  title,
  desc,
  blue,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  blue?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
        active
          ? "border-green-500 bg-green-50"
          : "border-gray-200 hover:border-green-300"
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg text-white ${
          blue ? "bg-blue-500" : "bg-green-600"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-gray-900">{title}</span>
        <span className="block text-xs text-gray-500">{desc}</span>
      </span>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          active ? "border-green-600 bg-green-600 text-white" : "border-gray-300"
        }`}
      >
        {active && <Check size={14} />}
      </span>
    </button>
  );
}