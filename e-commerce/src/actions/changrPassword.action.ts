"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { changePasswordSchemaType } from "@/schemas/changePassword.schema";

async function getRouteToken() {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return (decoded?.routeToken as string | undefined) ?? null;
}

export async function changePassword(data: changePasswordSchemaType) {
  try {
    const token = await getRouteToken();
    if (!token) return { ok: false, message: "Please sign in first" };

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json", token },
      },
    );
    const result = await res.json().catch(() => ({}));
    return { ok: res.ok, message: result?.message as string | undefined };
  } catch {
    return { ok: false, message: "Something went wrong, try again" };
  }
}