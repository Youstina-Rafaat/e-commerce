"use client";

import { useContext, useState } from "react";
import { addToCart, updateProductQuantity } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { CartContext } from "@/context/CartContext";
import PageLoader from "../PageLoader/PageLoader";

export default function AddBtn({
  styles,
  word,
  id,
  count = 1,
}: {
  styles: string;
  word: string;
  id: string;
  count?: number;
}) {
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function AddProduct() {
    if (loading) return;
    setLoading(true);

    try {
      const res = await addToCart(id);

      if (res.status !== "success") {
        toast.add({ type: "error", description: res.message });
        return;
      }

      if (count > 1) {
        const current =
          res.data?.products?.find((p: any) => p.product._id === id)?.count ?? 1;

        const upd = await updateProductQuantity(id, current + count - 1);

        if (upd.status !== "success") {
          toast.add({ type: "error", description: upd.message });
          return;
        }
      }

      toast.add({ type: "success", description: res.message });
      setnumberOfCartItems(numberOfCartItems + 1);
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong, please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className={`${styles} disabled:cursor-not-allowed disabled:opacity-70`}
      disabled={loading}
      aria-busy={loading}
      onClick={(e) => {
        e.preventDefault();
        AddProduct();
      }}
    >
      {loading ? <PageLoader size="sm" /> : word}
    </Button>
  );
}