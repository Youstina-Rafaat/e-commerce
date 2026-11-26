import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const banners = [
  { badge: "🔥 Deal of the Day", title: "Fresh Organic Fruits", text: "Get up to 40% off on selected organic fruits", off: "40% OFF", code: "ORGANIC40", button: "Shop Now", bg: "from-emerald-500 to-emerald-700", color: "text-emerald-600" },
  { badge: "✨ New Arrivals", title: "Exotic Vegetables", text: "Discover our latest collection of premium vegetables", off: "25% OFF", code: "FRESH25", button: "Explore Now", bg: "from-orange-400 to-red-500", color: "text-orange-600" },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto grid container gap-6 px-4 py-10 md:grid-cols-2">
      {banners.map((b) => (
        <div key={b.code} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white ${b.bg}`}>
          <span className="absolute -end-10 -top-10 size-36 rounded-full bg-white/10" />
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm">{b.badge}</span>
          <h3 className="mt-4 text-2xl font-bold md:text-3xl">{b.title}</h3>
          <p className="mt-2 text-white/80">{b.text}</p>
          <p className="mt-4 flex flex-wrap items-center gap-4">
            <strong className="text-3xl">{b.off}</strong>
            <span className="text-sm">Use code: <b>{b.code}</b></span>
          </p>
          <Link href="/products" className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold ${b.color}`}>
            {b.button} <LuArrowRight />
          </Link>
        </div>
      ))}
    </section>
  );
}