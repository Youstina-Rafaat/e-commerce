import { LoadingBannerProps } from "@/api/types/loadingBanner.type";
import Link from "next/link";



const gradients = {
  green: "from-green-600 to-green-500",
  purple: "from-purple-700 to-purple-500",
};

export default function LoadingBanner({
  color = "green",
  breadcrumb,
  title,
  subtitle,
  icon,
}: LoadingBannerProps) {
  return (
    <div className={`bg-gradient-to-r py-10 text-white ${gradients[color]}`}>
      <div className="mx-auto container px-4">
        <nav className="mb-4 flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-white">{breadcrumb}</span>
        </nav>

        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl">
            {icon}
          </span>
          <div>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-white/90">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}