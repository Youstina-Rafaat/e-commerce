"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getLoggedUserCart, removeAllProductsFromCart, removeProductFromCart, updateProductQuantity } from "@/actions/cart.action";
import {
  LuArrowLeft,
  LuCheck,
  LuShoppingCart,
  LuTrash2,
} from "react-icons/lu";
import OrderSummary from "../-components/OrderSummary/OrderSummary";
import ConfirmDialog from "../-components/ConfirmDialog/ConfirmDialog";
import EmptyCart from "../-components/EmptyCart/EmptyCart";
import QuantityCounter from "@/app/-components/QuantityCounter/QuantityCounter";
import { toast } from "@/components/ui/toast";
import { CartData } from "@/api/types/cart.type";
import { CartContext } from "@/context/CartContext";
import PageLoader from "@/app/-components/PageLoader/PageLoader";

function shorten(text: string, max = 40) {
  return text.length > max ? `${text.slice(0, max).trim()} ...` : text;
}

export default function Cart() {
  const router = useRouter();
  const [cartId, setcartId] = useState("");
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [productDetails, setProductDetails] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabledUpdate, setDisabledUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [removeTarget, setRemoveTarget] = useState<{ id: string; title: string } | null>(null);
  const [clearOpen, setClearOpen] = useState(false);
  const [clearedOpen, setClearedOpen] = useState(false);

  async function getUserCart() {
    const res = await getLoggedUserCart();
    if (res.status === "success") {
      setProductDetails(res.data);
      setcartId(res.cartId);
    }
    setLoading(false);
  }

  async function updateProduct(id: string, newCount: number) {
    setCurrentId(id);
    setDisabledUpdate(true);
    setLoadingUpdate(true);
    const res = await updateProductQuantity(id, newCount);
    if (res.status === "success") {
      toast.add({
        type: "success",
        description: res?.message,
      });
      setProductDetails(res.data);
      setDisabledUpdate(false);
      setLoadingUpdate(false);
    } else {
      toast.add({
        type: "error",
        description: res?.message,
      });
      setDisabledUpdate(false);
      setLoadingUpdate(false);
    }
  }

  async function removeProduct(productId: string) {
    setCurrentId(productId);
    setLoadingUpdate(true);
    const res = await removeProductFromCart(productId);
    if (res.status === "success") {
      toast.add({
        type: "success",
        description: res?.message,
      });
      setProductDetails(res.data);
      setLoadingUpdate(false);
      setnumberOfCartItems(numberOfCartItems - 1);
    } else {
      toast.add({
        type: "error",
        description: res?.message,
      });
      setLoadingUpdate(false);
    }
  }

  async function removeAllProducts() {
    const res = await removeAllProductsFromCart();
    if (res.status === "success") {
      setProductDetails(res.data);
      setnumberOfCartItems(0);
      return true;
    }
    toast.add({
      type: "error",
      description: res?.message,
    });
    return false;
  }

  async function handleConfirmRemove() {
    if (!removeTarget) return;
    const id = removeTarget.id;
    setRemoveTarget(null); 
    await removeProduct(id);
  }

  async function handleConfirmClear() {
    setClearOpen(false);
    const done = await removeAllProducts();
    if (done) setClearedOpen(true);
  }

  useEffect(() => {
    if (status === "authenticated") {
      getUserCart();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const products = productDetails?.products ?? [];
  const itemsCount = products.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="container mx-auto px-4 py-8">
      {loading ? (
        <PageLoader text="Loading your cart..." subtext="Just a moment" circle />
      ) : itemsCount === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800">Shopping Cart</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-white">
              <LuShoppingCart className="h-7 w-7" />
            </span>
            <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <p className="mt-3 text-gray-500">
            You have{" "}
            <span className="font-semibold text-green-600">{itemsCount} items</span> in
            your cart
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-5">
                {products.map((item) => (
                  <div
                    key={item.product._id}
                    className="relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row"
                  >
                    {currentId === item.product._id && loadingUpdate && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
                          Updating...
                        </span>
                      </div>
                    )}

                    <div className="flex shrink-0 flex-col items-center gap-3 self-center sm:self-start">
                      <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gray-50">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      {isLoggedIn && (item.product.quantity ?? 1) > 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                          <LuCheck className="h-3.5 w-3.5" />
                          In Stock
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-800">
                          {item.product.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          {item.product.category?.name && (
                            <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                              {item.product.category.name}
                            </span>
                          )}
                          {isLoggedIn && (
                            <span className="text-xs text-gray-500">
                              · SKU: {item.product._id.slice(-6).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-lg font-bold text-green-600">
                          {item.price} EGP
                          {isLoggedIn && (
                            <span className="ms-2 text-sm font-normal text-gray-500">
                              per unit
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <QuantityCounter
                          size="sm"
                          value={item.count}
                          disabled={disabledUpdate}
                          onDecrease={() => updateProduct(item.product._id, item.count - 1)}
                          onIncrease={() => updateProduct(item.product._id, item.count + 1)}
                        />

                        <div className="flex items-center gap-4">
                          <div className="text-end leading-tight">
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="text-xl font-bold text-gray-800">
                              {item.price * item.count}{" "}
                              <span className="text-sm font-normal text-gray-500">
                                EGP
                              </span>
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() =>
                              setRemoveTarget({
                                id: item.product._id,
                                title: item.product.title,
                              })
                            }
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                          >
                            <LuTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
                >
                  <LuArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={() => setClearOpen(true)}
                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 transition hover:text-red-500"
                >
                  <LuTrash2 className="h-4 w-4" />
                  Clear all items
                </button>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <OrderSummary
                itemsCount={itemsCount}
                total={productDetails?.totalCartPrice ?? 0}
                isLoggedIn={isLoggedIn}
                cartId={cartId}
              />
            </aside>
          </div>
        </>
      )}

      <ConfirmDialog
        open={removeTarget !== null}
        icon={<LuTrash2 />}
        title="Remove Item?"
        description={
          <>
            Remove{" "}
            <span className="font-semibold text-gray-900">
              {shorten(removeTarget?.title ?? "")}
            </span>{" "}
            from your cart?
          </>
        }
        cancelText="Cancel"
        confirmText="Remove"
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleConfirmRemove}
      />

      <ConfirmDialog
        open={clearOpen}
        icon={<LuShoppingCart />}
        title="Clear Your Cart?"
        description="All items will be removed from your cart. This action cannot be undone."
        cancelText="Keep Shopping"
        confirmText="Yes, Clear All"
        onClose={() => setClearOpen(false)}
        onConfirm={handleConfirmClear}
      />

      <ConfirmDialog
        open={clearedOpen}
        tone="success"
        icon={<LuCheck />}
        title="Cart Cleared!"
        description="Your cart is now empty."
        confirmText="Continue Shopping"
        onClose={() => setClearedOpen(false)}
        onConfirm={() => {
          setClearedOpen(false);
          router.push("/");
        }}
      />
    </section>
  );
}