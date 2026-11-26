"use client"

import { getLoggedUserWishlist } from "@/actions/wishlist.action"
import { createContext, ReactNode, useEffect, useState } from "react"

type WishlistContextType = {
  wishlistIds: string[]
  numberOfWishlistItems: number
  setWishlistIds: (ids: string[]) => void
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  numberOfWishlistItems: 0,
  setWishlistIds: () => {},
})

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])

  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist()
      if (res.status === "success") {
        setWishlistIds(res.data.map((p: { _id: string }) => p._id))
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    getUserWishlist()
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        numberOfWishlistItems: wishlistIds.length,
        setWishlistIds,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}