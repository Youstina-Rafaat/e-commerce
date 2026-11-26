import Link from "next/link";
import { LuUser } from "react-icons/lu";
import ProfileSidebar from "@/app/-components/ProfileSidebar/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-green-600 py-8 text-white">
        <div className="mx-auto container px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-green-100">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">My Account</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl">
              <LuUser />
            </span>
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="text-green-100">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto container px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16rem_1fr]">
          <aside>
            <ProfileSidebar />
          </aside>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}