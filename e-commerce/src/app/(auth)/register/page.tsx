import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import RegisterWelcome from "@/app/-components/RegisterWelcome/RegisterWelcome";
import RegisterForm from "@/app/-components/RegisterForm/RegisterForm";

const socialBtn =
  "flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50";

export default function SignupPage() {
  return (
    <section className="mx-auto container px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <RegisterWelcome />

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Your Account
          </h2>
          <p className="mt-1 text-gray-600">
            Start your fresh journey with us today
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className={socialBtn}>
              <FcGoogle className="h-5 w-5" />
              Google
            </button>
            <button type="button" className={socialBtn}>
              <FaFacebook className="h-5 w-5 text-blue-600" />
              Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-4 text-sm text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            or
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}