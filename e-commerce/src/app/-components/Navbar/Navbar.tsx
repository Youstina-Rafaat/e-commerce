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
} from "react-icons/lu";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import UserMenu from "../UserMenu/UserMenu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const { numberOfCartItems } = useContext(CartContext);
  const { numberOfWishlistItems } = useContext(WishlistContext);

  const { data: session, status } = useSession();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [catOpen, setCatOpen] = useState(false); 

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

  const closeSheet = () => setOpen(false);

  const drawerRow =
    "flex items-center gap-4 rounded-xl px-3 py-3.5 text-[15px] font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-600";

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

          <div className="hidden h-12 flex-1 items-center rounded-full border border-gray-200 bg-white ps-6 pe-1.5 lg:flex">
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
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

          <div className="ms-auto flex items-center gap-4 md:ms-0">
            <Link
              href="/wishlist"
              className="relative text-gray-600 transition hover:text-green-600"
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
              <div className="hidden sm:block lg:block">
                <UserMenu />
              </div>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-sm transition hover:bg-green-700 lg:hidden"
              >
                <LuMenu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-[85%] max-w-sm flex-col gap-0 overflow-y-auto bg-white p-0"
              >
                <SheetHeader className="flex-row items-center gap-2 border-b border-gray-100 p-5">
                  <LuShoppingCart className="h-8 w-8 text-green-600" />
                  <SheetTitle className="text-2xl font-bold tracking-tight text-gray-900">
                    FreshCart
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation menu
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                  <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-white ps-4 pe-1.5">
                    <input
                      type="search"
                      placeholder="Search products..."
                      className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700"
                    >
                      <LuSearch className="h-4 w-4" />
                    </button>
                  </div>

                  <nav className="mt-4 flex flex-col">
                    {links.map((link) =>
                      link.label === "Categories" ? (
                        <Collapsible
                          key={link.label}
                          open={catOpen}
                          onOpenChange={setCatOpen}
                        >
                          <CollapsibleTrigger
                            className={`${drawerRow} w-full justify-between`}
                          >
                            {link.label}
                            <LuChevronDown
                              className={`h-4 w-4 text-gray-500 transition ${catOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="ms-3 flex flex-col border-s border-gray-200 ps-3">
                              {categoryLinks.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeSheet}
                                  className="rounded-lg px-3 py-2.5 text-[14px] text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={closeSheet}
                          className={drawerRow}
                        >
                          {link.label}
                        </Link>
                      ),
                    )}
                  </nav>

                  <div className="my-4 border-t border-gray-100" />

                  <div className="flex flex-col">
                    <Link href="/wishlist" onClick={closeSheet} className={drawerRow}>
                      <LuHeart className="h-5 w-5 text-red-500" />
                      <span className="flex-1">Wishlist</span>
                      {numberOfWishlistItems !== 0 && (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                          {numberOfWishlistItems}
                        </span>
                      )}
                    </Link>

                    <Link href="/cart" onClick={closeSheet} className={drawerRow}>
                      <LuShoppingCart className="h-5 w-5 text-green-600" />
                      <span className="flex-1">Cart</span>
                      {numberOfCartItems !== 0 && (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-semibold text-white">
                          {numberOfCartItems}
                        </span>
                      )}
                    </Link>
                  </div>

                  <div className="my-4 border-t border-gray-100" />

                  <div className="flex flex-col">
                    {status === "authenticated" ? (
                      <>
                        <Link
                          href="/profile/settings"
                          onClick={closeSheet}
                          className={drawerRow}
                        >
                          <LuUser className="h-5 w-5 text-gray-500" />
                          {session?.user?.name ?? "My Account"}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            closeSheet();
                            handleLogOut();
                          }}
                          className="flex cursor-pointer items-center gap-4 rounded-xl px-3 py-3.5 text-[15px] font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <LuLogOut className="h-5 w-5" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={closeSheet}
                          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                          <LuUser className="h-4 w-4" />
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={closeSheet}
                          className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl border border-green-600 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-600">
                        <LuHeadset className="h-5 w-5" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-gray-800">Need Help?</p>
                        <p className="text-sm text-green-600">Contact Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}