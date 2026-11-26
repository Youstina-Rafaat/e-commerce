import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { LuCreditCard, LuHeadset, LuMail, LuMapPin, LuPhone, LuRotateCcw, LuShield, LuShoppingCart, LuTruck } from "react-icons/lu";

const features = [
  { Icon: LuTruck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { Icon: LuRotateCcw, title: "Easy Returns", text: "14-day return policy" },
  { Icon: LuShield, title: "Secure Payment", text: "100% secure checkout" },
  { Icon: LuHeadset, title: "24/7 Support", text: "Contact us anytime" },
];

const columns: { title: string; links: { label: string; href?: string }[] }[] = [
  { title: "Shop", links: [
    { label: "All Products", href: "/products" }, { label: "Categories", href: "/categories" }, { label: "Brands", href: "/brands" },
    { label: "Electronics" }, { label: "Men's Fashion" }, { label: "Women's Fashion" },
  ] },
  { title: "Account", links: [
    { label: "My Account" }, { label: "Order History" }, { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" }, { label: "Sign In", href: "/login" }, { label: "Create Account", href: "/register" },
  ] },
  { title: "Support", links: [
    { label: "Contact Us" }, { label: "Help Center" }, { label: "Shipping Info" }, { label: "Returns & Refunds" }, { label: "Track Order" },
  ] },
  { title: "Legal", links: [{ label: "Privacy Policy" }, { label: "Terms of Service" }, { label: "Cookie Policy" }] },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-green-50">
        <div className="mx-auto grid container gap-6 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-green-100 text-green-600"><Icon className="size-5" /></span>
              <div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-gray-400">
        <div className="mx-auto grid container gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3">
              <LuShoppingCart className="size-7 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">FreshCart</span>
            </Link>
            <p className="mt-6 text-sm leading-7">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3"><LuPhone className="text-green-500" /> +1 (800) 123-4567</li>
              <li className="flex items-center gap-3"><LuMail className="text-green-500" /> support@freshcart.com</li>
              <li className="flex items-center gap-3"><LuMapPin className="text-green-500" /> 123 Commerce Street, New York, NY 10001</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <span key={i} className="grid size-10 place-items-center rounded-full bg-white/10"><Icon /></span>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? <Link href={link.href} className="hover:text-green-500">{link.label}</Link> : <span>{link.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex container flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="flex gap-5">
              {["Visa", "Mastercard", "PayPal"].map((name) => (
                <span key={name} className="flex items-center gap-2"><LuCreditCard /> {name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}