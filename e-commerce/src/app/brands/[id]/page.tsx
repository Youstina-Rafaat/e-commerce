import Image from "next/image";
import Link from "next/link";
import { LuTag, LuX } from "react-icons/lu";
import { getSingleBrand } from "@/actions/brand.action";
import { BrandDetails } from "../../-components/BrandDetails/BrandDetails";
import PageHeader from "@/app/-components/PageHeader/PageHeader";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await getSingleBrand(id);
  const title = brand?.name ?? "Brand";

  return (
    <main className="min-h-screen bg-gray-50">
<PageHeader
  icon={
    brand ? (
      <Image src={brand.image} alt={brand.name} width={44} height={44} className="rounded bg-white object-contain" />
    ) : (
      <LuTag />
    )
  }
  tag={[{ label: "Brands", href: "/brands" }, { label: title }]}
  title={title}
  description={`Shop ${title} products`}
/>

      <div className="mx-auto container px-4 py-6">
        {brand && (
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
               Active Filters:
            </span>
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-violet-700"
            >
              <LuTag className="size-3" /> {brand.name} <LuX className="size-3" />
            </Link>
            <Link href="/products" className="underline hover:text-gray-900">
              Clear all
            </Link>
          </div>
        )}

        <BrandDetails brandId={id} />
      </div>
    </main>
  );
}