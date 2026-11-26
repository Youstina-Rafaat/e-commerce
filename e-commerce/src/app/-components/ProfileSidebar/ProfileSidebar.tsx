"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronRight, LuMapPin, LuSettings } from "react-icons/lu";

const links = [
  { href: "/profile/addresses", label: "My Addresses", icon: <LuMapPin /> },
  { href: "/profile/settings", label: "Settings", icon: <LuSettings /> },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-3 px-2 font-semibold text-gray-800">My Account</p>
      <ul className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-green-50 font-medium text-green-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    active
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {link.icon}
                </span>
                <span className="flex-1">{link.label}</span>
                <LuChevronRight className="h-4 w-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}