import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LuLock, LuStar, LuUsers } from "react-icons/lu";
import LoginHero from "@/app/-components/LoginHero/LoginHero";
import LoginForm from "@/app/-components/LoginForm/LoginForm";

const socialBtn =
  "flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-200 py-3 font-medium text-gray-700 transition hover:bg-gray-50";

export default function LoginPage() {
  return (
    <section className="mx-auto container px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <LoginHero />

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-center text-3xl font-bold text-green-600">
            FreshCart
          </p>
          <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
            Welcome Back!
          </h1>
          <p className="mt-1 text-center text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>

          <div className="mt-6 space-y-3">
            <button type="button" className={socialBtn}>
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>
            <button type="button" className={socialBtn}>
              <FaFacebook className="h-5 w-5 text-blue-600" />
              Continue with Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-4 text-xs font-medium text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            OR CONTINUE WITH EMAIL
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-gray-600">
            New to FreshCart?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <li className="flex items-center gap-1.5">
              <LuLock /> SSL Secured
            </li>
            <li className="flex items-center gap-1.5">
              <LuUsers /> 50K+ Users
            </li>
            <li className="flex items-center gap-1.5">
              <LuStar /> 4.9 Rating
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}