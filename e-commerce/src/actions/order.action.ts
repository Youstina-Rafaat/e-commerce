"use server";

import { getMyToken } from "@/utilites";

function getUserIdFromToken(token: string): string {
  const payload = token.split(".")[1];
  const json = Buffer.from(payload, "base64url").toString("utf-8");
  return JSON.parse(json).id;
}

export async function getUserOrders() {
  const token = await getMyToken();
  if (!token) throw new Error("login first");

  const userId = getUserIdFromToken(token as string);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    { headers: { token: token as string }, cache: "no-store" },
  );
  return res.json();
}