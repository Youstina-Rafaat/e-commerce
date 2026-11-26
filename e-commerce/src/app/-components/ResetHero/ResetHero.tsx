import { LuLock, LuMail, LuShieldCheck } from "react-icons/lu";

const badges = [
  { icon: <LuMail />, text: "Email Verification" },
  { icon: <LuShieldCheck />, text: "Secure Reset" },
  { icon: <LuLock />, text: "Encrypted" },
];

export default function ResetHero() {
  return (
    <div className="text-center">
      <div className="flex h-72 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 via-green-50 to-white">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 -rotate-12 items-center justify-center rounded-2xl bg-white text-2xl text-green-600 shadow-md">
            <LuMail />
          </span>
          <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-lg">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-4xl text-green-600">
              <LuLock />
            </span>
          </span>
          <span className="flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl bg-white text-2xl text-green-600 shadow-md">
            <LuShieldCheck />
          </span>
        </div>
        <div className="mt-6 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-600" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
      </div>

      <h2 className="mt-8 text-3xl font-bold text-gray-800">
        Reset Your Password
      </h2>
      <p className="mx-auto mt-3 max-w-md text-gray-600">
        Don&apos;t worry, it happens to the best of us. We&apos;ll help you get
        back into your account in no time.
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