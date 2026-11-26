"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Clock,
  CreditCard,
  Package,
  MapPin,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { getUserOrders } from "@/actions/order.action";
import { Order } from "@/api/types/allorders.type";



function getStatus(o: Order) {
  if (o.isDelivered)
    return {
      label: "Delivered",
      cls: "bg-green-50 text-green-700",
      Icon: CircleCheck,
    };
  if (o.isPaid)
    return { label: "On the way", cls: "bg-blue-50 text-blue-600", Icon: Truck };
  return {
    label: "Processing",
    cls: "bg-amber-50 text-amber-600",
    Icon: Clock,
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserOrders();
        const list: Order[] = Array.isArray(res) ? res : (res?.data ?? []);
        setOrders(
          [...list].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      } catch {
        setOrders([]);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto container px-4">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>{" "}
          / <span className="text-gray-800">My Orders</span>
        </nav>

        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <Package size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-500">
                Track and manage your {orders?.length ?? 0} orders
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600"
          >
            <ShoppingBag size={14} /> Continue Shopping
          </Link>
        </div>

        {orders === null && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border bg-white"
              />
            ))}
          </div>
        )}

        {orders?.length === 0 && (
          <div className="rounded-2xl border bg-white py-16 text-center shadow-sm">
            <Package size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="font-semibold text-gray-800">No orders yet</p>
            <p className="mb-5 text-sm text-gray-500">
              Your orders will show up here after checkout.
            </p>
            <Link
              href="/shop"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Start Shopping
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders?.map((o) => {
            const status = getStatus(o);
            const open = openId === o._id;
            const first = o.cartItems?.[0];
            const extra = (o.cartItems?.length ?? 0) - 1;
            const itemsCount = o.cartItems?.reduce((s, i) => s + i.count, 0);

            return (
              <article
                key={o._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="flex items-center gap-5 p-5">
                  <div className="relative h-20 w-20 shrink-0 rounded-xl bg-gray-50 p-2">
                    {first?.product?.imageCover && (
                      <Image
                        src={first.product.imageCover}
                        alt={first.product.title}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    )}
                    {extra > 0 && (
                      <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-[11px] font-semibold text-white">
                        +{extra}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${status.cls}`}
                    >
                      <status.Icon size={12} /> {status.label}
                    </span>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      # {o.id}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {new Date(o.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package size={12} /> {itemsCount} items
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {o.shippingAddress?.city}
                      </span>
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {o.totalOrderPrice}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        EGP
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    <span
                      title={
                        o.paymentMethodType === "card"
                          ? "Paid online"
                          : "Cash on delivery"
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600"
                    >
                      {o.paymentMethodType === "card" ? (
                        <CreditCard size={16} />
                      ) : (
                        <Banknote size={16} />
                      )}
                    </span>
                    <button
                      onClick={() => setOpenId(open ? null : o._id)}
                      className={`flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        open
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {open ? "Hide" : "Details"}
                      {open ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {open && (
                  <div className="border-t bg-gray-50/60 p-5">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">
                        <Package size={12} />
                      </span>
                      Order Items
                    </p>

                    <ul className="space-y-2">
                      {o.cartItems.map((it) => (
                        <li
                          key={it._id}
                          className="flex items-center gap-4 rounded-xl bg-white p-3"
                        >
                          <div className="relative h-12 w-12 shrink-0">
                            <Image
                              src={it.product.imageCover}
                              alt={it.product.title}
                              fill
                              sizes="48px"
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-800">
                              {it.product.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {it.count} × {it.price} EGP
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {it.count * it.price}
                            </p>
                            <p className="text-[10px] text-gray-400">EGP</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-white p-4 text-sm">
                        <p className="mb-2 flex items-center gap-2 font-semibold text-gray-700">
                          <MapPin size={14} className="text-blue-600" />
                          Delivery Address
                        </p>
                        <p className="text-gray-800">
                          {o.shippingAddress?.city}
                        </p>
                        <p className="text-gray-500">
                          {o.shippingAddress?.details}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-gray-500">
                          <Phone size={12} /> {o.shippingAddress?.phone}
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 p-4 text-sm">
                        <p className="mb-2 flex items-center gap-2 font-semibold text-gray-700">
                          <ShoppingBag size={14} className="text-blue-600" />
                          Order Summary
                        </p>
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>{o.totalOrderPrice} EGP</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="font-medium text-green-600">
                            Free
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-blue-100 pt-2 font-bold text-gray-900">
                          <span>Total</span>
                          <span>{o.totalOrderPrice} EGP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}