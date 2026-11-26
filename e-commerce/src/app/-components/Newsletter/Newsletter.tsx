import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { LuArrowRight, LuLeaf, LuMail, LuTag, LuTruck } from "react-icons/lu";

const perks = [
  { Icon: LuLeaf, label: "Fresh Picks Weekly" },
  { Icon: LuTruck, label: "Free Delivery Codes" },
  { Icon: LuTag, label: "Members-Only Deals" },
];

const stores = [
  { Icon: FaApple, small: "DOWNLOAD ON", name: "App Store" },
  { Icon: FaGooglePlay, small: "GET IT ON", name: "Google Play" },
];

export default function Newsletter() {
  return (
    <section className="mx-auto container px-4 py-12">
      <div className="grid gap-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-white p-6 md:p-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-xl bg-emerald-500 text-white shadow-lg"><LuMail className="size-6" /></span>
            <div>
              <p className="text-sm font-bold text-emerald-600">NEWSLETTER</p>
              <p className="text-xs text-gray-500">50,000+ subscribers</p>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            Get the Freshest Updates <span className="text-emerald-600">Delivered Free</span>
          </h2>
          <p className="mt-3 text-gray-500">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {perks.map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
                <Icon className="text-emerald-600" /> {label}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="you@example.com" aria-label="Email" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-5 py-4 outline-none focus:border-emerald-500" />
            <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-600">
              Subscribe <LuArrowRight />
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-400">✨ Unsubscribe anytime. No spam, ever.</p>
        </div>

        <div className="rounded-2xl bg-slate-800 p-8 text-white">
          <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-bold text-emerald-400">📱 MOBILE APP</span>
          <h3 className="mt-5 text-2xl font-bold">Shop Faster on Our App</h3>
          <p className="mt-3 text-sm text-gray-300">Get app-exclusive deals &amp; 15% off your first order.</p>
          <div className="mt-5 space-y-3">
            {stores.map(({ Icon, small, name }) => (
              <div key={name} className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-3">
                <Icon className="size-6" />
                <div>
                  <p className="text-[10px] text-gray-400">{small}</p>
                  <p className="font-semibold">{name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-gray-300"><span className="text-yellow-400">★★★★★</span> 4.9 • 100K+ downloads</p>
        </div>
      </div>
    </section>
  );
}