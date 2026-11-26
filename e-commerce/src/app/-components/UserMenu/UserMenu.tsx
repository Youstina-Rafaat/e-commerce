"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  LuCircleUser,
  LuContact,
  LuHeart,
  LuLogOut,
  LuPackage,
  LuSettings,
  LuUser,
} from "react-icons/lu";

const items = [
  { href: "/profile", label: "My Profile", icon: <LuUser /> },
  { href: "/allorders", label: "My Orders", icon: <LuPackage /> },
  { href: "/wishlist", label: "My Wishlist", icon: <LuHeart /> },
  { href: "/profile/addresses", label: "Addresses", icon: <LuContact /> },
  { href: "/profile/settings", label: "Settings", icon: <LuSettings /> },
];

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center text-gray-600 transition hover:text-green-600"
      >
        <LuCircleUser className="h-7 w-7" />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
              <LuCircleUser />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800">
                {session?.user?.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 py-2">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-green-600"
              >
                <span className="text-lg text-gray-500">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full cursor-pointer items-center gap-3 px-5 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
            >
              <LuLogOut className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}