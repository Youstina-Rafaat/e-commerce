"use client";

import { useContext, useState } from "react";
import { LuHeart } from "react-icons/lu";
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist.action";
import { toast } from "@/components/ui/toast";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishlistBtn({
  id,
  className = "",
  showLabel = false,
}: {
  id: string;
  className?: string;
  showLabel?: boolean; 
}) {
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlistIds.includes(id);

  async function handleClick() {
    setLoading(true);
    try {
      const res = isInWishlist
        ? await removeFromWishlist(id)
        : await addToWishlist(id);

      if (res.status === "success") {
        toast.add({ type: "success", description: res?.message });
        setWishlistIds(res.data);
      } else {
        toast.add({ type: "error", description: res?.message });
      }
    } catch {
      toast.add({ type: "error", description: "Please login first" });
    }
    setLoading(false);
  }

  return (
    <button
      type="button"
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      disabled={loading}
      onClick={handleClick}
      className={`${className} cursor-pointer disabled:opacity-60`}
    >
      <LuHeart
        className={`${showLabel ? "h-4 w-4" : "h-5 w-5"} ${
          isInWishlist ? "fill-red-500 text-red-500" : ""
        }`}
      />
      {showLabel && (isInWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
    </button>
  );
}