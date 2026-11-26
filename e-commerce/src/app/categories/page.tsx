import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuLayers } from "react-icons/lu";
import { getAllCategories } from "@/api/services/routemisr.service";
import PageHeader from "../-components/PageHeader/PageHeader";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
     <PageHeader
  icon={<LuLayers />}
  tag={[{ label: "Categories" }]}
  title="All Categories"
  description="Browse our wide range of product categories"
/>
      <section className="mx-auto grid container grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-3 lg:grid-cols-5">
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 h-14 text-center">
              <h2 className="font-semibold text-gray-700 group-hover:text-green-600">
                {category.name}
              </h2>
              <span className="mt-2 flex items-center justify-center gap-1 text-sm text-green-600 opacity-0 transition group-hover:opacity-100">
                View Subcategories <LuArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}