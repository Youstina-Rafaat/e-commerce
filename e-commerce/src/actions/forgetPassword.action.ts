"use server";

const BASE = "https://ecommerce.routemisr.com/api/v1/auth";

type ActionResult = { ok: boolean; message?: string };

async function request(
  path: string,
  method: "POST" | "PUT",
  body: object,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${BASE}/${path}`, {
      method,
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    });
    const result = await res.json().catch(() => ({}));
    return { ok: res.ok, message: result?.message };
  } catch {
    return { ok: false, message: "Something went wrong, try again" };
  }
}

export async function sendResetCode(email: string) {
  return request("forgotPasswords", "POST", { email });
}

export async function verifyResetCode(resetCode: string) {
  return request("verifyResetCode", "POST", { resetCode });
}

export async function resetPassword(email: string, newPassword: string) {
  return request("resetPassword", "PUT", { email, newPassword });
}