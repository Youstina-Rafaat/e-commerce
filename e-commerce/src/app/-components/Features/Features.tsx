import { LuHeadset, LuRotateCcw, LuShield, LuTruck } from "react-icons/lu";

const features = [
  { Icon: LuTruck, title: "Free Shipping", text: "On orders over 500 EGP", color: "bg-blue-50 text-blue-600" },
  { Icon: LuShield, title: "Secure Payment", text: "100% secure transactions", color: "bg-green-50 text-green-600" },
  { Icon: LuRotateCcw, title: "Easy Returns", text: "14-day return policy", color: "bg-orange-50 text-orange-600" },
  { Icon: LuHeadset, title: "24/7 Support", text: "Dedicated support team", color: "bg-violet-50 text-violet-600" },
];

export default function Features() {
  return (
    <section className="mx-auto grid container gap-5 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {features.map(({ Icon, title, text, color }) => (
        <div key={title} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <span className={`grid size-12 shrink-0 place-items-center rounded-full ${color}`}>
            <Icon className="size-6" />
          </span>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}