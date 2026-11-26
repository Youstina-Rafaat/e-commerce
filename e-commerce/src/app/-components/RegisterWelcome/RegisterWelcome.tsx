import { LuShieldCheck, LuStar, LuTruck } from "react-icons/lu";

const features = [
  {
    icon: <LuStar />,
    title: "Premium Quality",
    text: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: <LuTruck />,
    title: "Fast Delivery",
    text: "Same-day delivery available in most areas",
  },
  {
    icon: <LuShieldCheck />,
    title: "Secure Shopping",
    text: "Your data and payments are completely secure",
  },
];

export default function RegisterWelcome() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to <span className="text-green-600">FreshCart</span>
      </h1>
      <p className="mt-3 max-w-md text-lg text-gray-600">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>

      <ul className="mt-8 space-y-6">
        {features.map((f) => (
          <li key={f.title} className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
              {f.icon}
            </span>
            <div>
              <p className="font-semibold text-gray-800">{f.title}</p>
              <p className="text-gray-600">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <figure className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
        <figcaption className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
            SJ
          </span>
          <div>
            <p className="font-medium text-gray-800">Sarah Johnson</p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <LuStar
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        </figcaption>
        <blockquote className="mt-4 italic text-gray-600">
          &quot;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding, and the delivery is always on time.
          Highly recommend!&quot;
        </blockquote>
      </figure>
    </div>
  );
}