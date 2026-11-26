"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuHeart,
  LuShoppingCart,
  LuTrash2,
} from "react-icons/lu";
import {
  getLoggedUserWishlist,
  removeFromWishlist,
} from "@/actions/wishlist.action";
import { addToCart, getLoggedUserCart } from "@/actions/cart.action";
import { toast } from "@/components/ui/toast";
import { ProductType } from "@/api/types/product.type";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import PageLoader from "@/app/-components/PageLoader/PageLoader";

function EmptyState({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <LuHeart className="h-10 w-10" />
      </span>
      <h2 className="mt-8 text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-500">{text}</p>
      <Link
        href={href}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700"
      >
        {label}
        <LuArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}

const formatPrice = (n: number) => `${n.toLocaleString("en-US")} EGP`;

export default function Wishlist() {
  const { status } = useSession();
  const { setnumberOfCartItems } = useContext(CartContext);
  const { setWishlistIds } = useContext(WishlistContext);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  async function loadData() {
    try {
      const [wishRes, cartRes] = await Promise.all([
        getLoggedUserWishlist(),
        getLoggedUserCart(),
      ]);

      if (wishRes.status === "success") {
        setProducts(wishRes.data);
        setWishlistIds(wishRes.data.map((p: ProductType) => p._id));
      }

      const cartProducts = cartRes?.data?.products ?? [];
      setCartIds(cartProducts.map((p: { product: { _id: string } }) => p.product._id));
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(productId: string) {
    setCurrentId(productId);
    setLoadingUpdate(true);
    const res = await removeFromWishlist(productId);
    if (res.status === "success") {
      toast.add({ type: "success", description: res?.message });
      const next = products.filter((p) => p._id !== productId);
      setProducts(next);
      setWishlistIds(next.map((p) => p._id));
    } else {
      toast.add({ type: "error", description: res?.message });
    }
    setLoadingUpdate(false);
  }

  async function addProductToCart(productId: string) {
    setCurrentId(productId);
    setLoadingUpdate(true);
    const res = await addToCart(productId);
    if (res.status === "success") {
      toast.add({ type: "success", description: res?.message });
      setnumberOfCartItems(res.numOfCartItems);
      setCartIds((prev) => [...prev, productId]);
    } else {
      toast.add({ type: "error", description: res?.message });
    }
    setLoadingUpdate(false);
  }

  useEffect(() => {
    if (status === "authenticated") {
      loadData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  return (
    <section className="container mx-auto px-4 py-8">
      

      {status === "unauthenticated" ? (
        <EmptyState
          title="Please login first"
          text="Login to see and save your favorite products."
          href="/login"
          label="Login"
        />
      ) : loading ? (
        <PageLoader text="Loading wishlist..." />
      ) : products.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          text="Browse products and save your favorites here."
          href="/products"
          label="Browse Products"
        />
      ) : (
        <>
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800">Wishlist</span>
      </nav>
        <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
          <LuHeart className="h-6 w-6 fill-red-500 text-red-500" />
        </span>
        <div className="leading-tight">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          {!loading && products.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              {products.length} {products.length === 1 ? "item" : "items"} saved
            </p>
          )}
        </div>
      </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="hidden grid-cols-[1fr_160px_140px_240px] items-center border-b border-gray-100 px-6 py-4 text-sm font-medium text-gray-500 md:grid">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Status</span>
              <span className="text-center">Actions</span>
            </div>

            <div className="divide-y divide-gray-100">
              {products.map((item) => {
                const hasDiscount =
                  !!item.priceAfterDiscount &&
                  item.priceAfterDiscount < item.price;
                const finalPrice = hasDiscount
                  ? item.priceAfterDiscount!
                  : item.price;
                const inCart = cartIds.includes(item._id);
                const inStock = (item.quantity ?? 1) > 0;

                return (
                  <div
                    key={item._id}
                    className="relative grid grid-cols-1 items-center gap-4 px-6 py-5 md:grid-cols-[1fr_160px_140px_240px]"
                  >
                    {currentId === item._id && loadingUpdate && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
                          Updating...
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/productdetails/${item._id}`}
                      className="flex items-center gap-4"
                    >
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block line-clamp-1 font-medium text-gray-800">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          {item.category?.name}
                        </span>
                      </span>
                    </Link>

                    <div className="flex flex-col items-start leading-tight md:items-center">
                      <span className="font-semibold text-gray-800">
                        {formatPrice(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    <div className="flex md:justify-center">
                      {inCart ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          <LuShoppingCart className="h-3.5 w-3.5" />
                          In Cart
                        </span>
                      ) : inStock ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          In Stock
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 md:justify-center">
                      {inCart ? (
                        <Link
                          href="/cart"
                          className="flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
                        >
                          <LuCheck className="h-4 w-4" />
                          View Cart
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled={loadingUpdate || !inStock}
                          onClick={() => addProductToCart(item._id)}
                          className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <LuShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>
                        )}
                      <button
                        type="button"
                        disabled={loadingUpdate}
                        onClick={() => removeProduct(item._id)}
                        aria-label="Remove from wishlist"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-60"
                      >
                        <LuTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            <LuArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </>
      )}
    </section>
  );
}