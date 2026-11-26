import { LuClock, LuShieldCheck, LuTruck } from "react-icons/lu";
import Image from "next/image";
import cartImg from "@/assets/images/2e5810ff3e-e750761ebcd4ae5907db.png"; 

const badges = [
  { icon: <LuTruck />, text: "Free Delivery" },
  { icon: <LuShieldCheck />, text: "Secure Payment" },
  { icon: <LuClock />, text: "24/7 Support" },
];

export default function LoginHero() {
  return (
    <div className="text-center">
      <div className="overflow-hidden rounded-3xl bg-gray-50 p-6">

        <Image
  src={cartImg}
  alt="Shopping cart full of fresh products"
  className="mx-auto h-80 w-full object-contain"
  priority
/>
      </div>

      <h2 className="mx-auto mt-8 max-w-lg text-3xl font-bold text-gray-800">
        FreshCart - Your One-Stop Shop for Fresh Products
      </h2>
      <p className="mx-auto mt-3 max-w-md text-gray-600">
        Join thousands of happy customers who trust FreshCart for their daily
        grocery needs
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
        {badges.map((b) => (
          <li key={b.text} className="flex items-center gap-2">
            <span className="text-green-600">{b.icon}</span>
            {b.text}
          </li>
        ))}
      </ul>
    </div>
  );
}