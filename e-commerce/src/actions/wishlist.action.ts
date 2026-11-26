"use server"

import { getMyToken } from "@/utilites"

const WISHLIST_URL = "https://ecommerce.routemisr.com/api/v1/wishlist"

async function getAuthToken() {
  const token = await getMyToken()

  if (!token) {
    throw new Error("please login frist..")
  }

  return token as string
}

export async function addToWishlist(productId: string) {
  const token = await getAuthToken()

  const res = await fetch(WISHLIST_URL, {
    method: "POST",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  })

  const data = await res.json()
  return data
}

export async function getLoggedUserWishlist() {
  const token = await getAuthToken()

  const res = await fetch(WISHLIST_URL, {
    method: "GET",
    headers: {
      token: token,
    },
  })

  const data = await res.json()
  return data
}

export async function removeFromWishlist(productId: string) {
  const token = await getAuthToken()

  const res = await fetch(`${WISHLIST_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  })

  const data = await res.json()
  return data
}