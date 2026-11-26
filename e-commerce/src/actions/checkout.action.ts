"use server";

import { checkoutSchemaType } from '@/schemas/checkout.schema'
import { getMyToken } from "@/utilites";

export async function cashPayment(
  cartId: string,
  formValues: checkoutSchemaType,
) {
  const token = await getMyToken();
  if (!token) throw new Error("login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: { token: token as string, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  return res.json();
}



export async function onlinePayment(
  cartId: string,
  url: string,
  formValues: checkoutSchemaType,
) {
  const token = await getMyToken();
  if (!token) throw new Error("login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: { token: token as string, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  return res.json();
}