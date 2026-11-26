import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuTags } from "react-icons/lu";
import { getAllBrands } from "@/actions/brand.action";
import PageHeader from "../-components/PageHeader/PageHeader";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHeader
  icon={<LuTags />}
  tag={[{ label: "Brands" }]}
  title="Top Brands"
  description="Shop from your favorite brands"
  color="purple"
/>

      <section className="mx-auto grid container grid-cols-2 gap-5 px-4 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands?.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                className="object-contain p-3 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 h-12 text-center">
              <h2 className="text-sm font-semibold text-gray-700 group-hover:text-violet-600">
                {brand.name}
              </h2>
              <span className="mt-1 flex items-center justify-center gap-1 text-xs text-violet-600 opacity-0 transition group-hover:opacity-100">
                View Products <LuArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}