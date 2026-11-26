"use client";

import { useContext, useEffect, useState } from "react";
import { getAllCategories } from "@/api/services/routemisr.service";
import { CategoryType } from "@/api/types/product.type";
import Link from "next/link";
import {
  LuChevronDown,
  LuGift,
  LuLogOut,
  LuMail,
  LuPhone,
  LuTruck,
  LuHeadset,
  LuHeart,
  LuMenu,
  LuSearch,
  LuShoppingCart,
  LuUser,
  LuX,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import UserMenu from "../UserMenu/UserMenu";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

const menuNames = ["Electronics", "Women's Fashion", "Men's Fashion", "Beauty & Health"];

function handleLogOut() {
  signOut({ redirect: true, callbackUrl: "/login" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  const { numberOfWishlistItems } = useContext(WishlistContext);

  const { data: session, status } = useSession();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (!data) return;
      setCategories(
        menuNames.flatMap((name) => data.filter((c) => c.name === name)),
      );
    });
  }, []);

  const categoryLinks = [
    { label: "All Categories", href: "/categories" },
    ...categories.map((c) => ({ label: c.name, href: `/categories/${c._id}/products` })),
  ];

  return (
    <>
      <div className="hidden border-b border-gray-100 bg-white text-sm text-gray-500 lg:block">
        <div className="mx-auto flex h-10 container items-center justify-between px-4">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><LuTruck className="text-green-600" /> Free Shipping on Orders 500 EGP</span>
            <span className="flex items-center gap-2"><LuGift className="text-green-600" /> New Arrivals Daily</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><LuPhone /> +1 (800) 123-4567</span>
            <span className="flex items-center gap-2"><LuMail /> support@freshcart.com</span>
            {status === "authenticated" && (
              <div className="flex items-center gap-4 border-s border-gray-200 ps-5">
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-2 transition hover:text-green-600"
                >
                  <LuUser /> {session?.user?.name ?? "Account"}
                </Link>
                <button type="button" onClick={handleLogOut} className="flex cursor-pointer items-center gap-2 hover:text-red-600">
                  <LuLogOut /> Sign Out
                </button>
              </div>
            )}
            {status === "unauthenticated" && (
              <div className="flex gap-4 border-s border-gray-200 ps-5">
                <Link href="/login" className="hover:text-green-600">Sign In</Link>
                <Link href="/signup" className="hover:text-green-600">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-20 container items-center gap-4 px-4 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <LuShoppingCart className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              FreshCart
            </span>
          </Link>

          <div
            className={`hidden h-12 flex-1 items-center rounded-full border border-gray-200 bg-white ps-6 pe-1.5 lg:flex`}
          >
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              aria-label="Search"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
            >
              <LuSearch className="h-4 w-4" />
            </button>
          </div>

          <nav className="ms-auto hidden items-center gap-8 lg:flex">
            {links.map((link) =>
              link.label === "Categories" ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(true)}
                    className="flex items-center gap-1 py-7 text-[15px] font-medium text-gray-800 transition hover:text-green-600"
                  >
                    {link.label}
                    <LuChevronDown className={`h-4 w-4 transition ${menuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {menuOpen && (
                    <div className="absolute start-0 top-full w-56 rounded-b-xl border border-gray-100 bg-white py-2 shadow-lg">
                      {categoryLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-5 py-3 text-[15px] text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1 text-[15px] font-medium text-gray-800 transition hover:text-green-600"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 border-e border-gray-200 pe-5 xl:flex">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <LuHeadset className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">Support</p>
              <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
            </div>
          </div>

          <div className="ms-auto flex items-center gap-3 sm:gap-4 md:ms-0">
            <Link
              href="/wishlist"
              className="relative hidden text-gray-600 transition hover:text-green-600 sm:block"
            >
              <LuHeart className="h-6 w-6" />
              {numberOfWishlistItems !== 0 && (
                <span className="absolute -end-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
                  {numberOfWishlistItems}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative text-gray-600 transition hover:text-green-600"
            >
              <LuShoppingCart className="h-6 w-6" />
              {numberOfCartItems !== 0 && (
                <span className="absolute -end-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[11px] font-semibold text-white">
                  {numberOfCartItems}
                </span>
              )}
            </Link>

            {status === "authenticated" && (
              <div className="hidden sm:block">
                <UserMenu />
              </div>
            )}

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-gray-700 transition hover:text-green-600 lg:hidden"
            >
              {open ? <LuX className="h-7 w-7" /> : <LuMenu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-4 lg:hidden">
            <div
              className={`flex h-12 items-center rounded-full border border-gray-200 bg-white ps-6 pe-1.5`}
            >
              <input
                type="search"
                placeholder="Search for products, brands and more..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                aria-label="Search"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
              >
                <LuSearch className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col">
              {links
                .flatMap((link) => (link.label === "Categories" ? categoryLinks : [link]))
                .map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-gray-100 py-3 text-[15px] font-medium text-gray-800 hover:text-green-600"
                  >
                    {link.label}
                  </Link>
                ))}

              {status === "authenticated" && (
                <Link
                  href="/profile/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 py-3 text-[15px] font-medium text-gray-800 hover:text-green-600"
                >
                  My Account
                </Link>
              )}
            </nav>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                <LuHeadset className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-gray-500">Support</p>
                <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
              </div>
            </div>

            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <LuUser className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <LuUser className="h-4 w-4" />
                  Sign Up
                </Link>
              </>
            ) : (
              <Button
                onClick={() => {
                  setOpen(false);
                  handleLogOut();
                }}
                className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
              >
                LogOut
              </Button>
            )}
          </div>
        )}
      </header>
    </>
  );
}