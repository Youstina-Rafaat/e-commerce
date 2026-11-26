import Image from "next/image";
import Link from "next/link";
import { LuFuel, LuLayers, LuPackageOpen, LuX } from "react-icons/lu";
import { getProductsByCategory, getSingleCategory } from "@/api/services/routemisr.service";
import ProductCard from "../../../-components/ProductCard/ProductCard";
import PageHeader from "@/app/-components/PageHeader/PageHeader";

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, products] = await Promise.all([
    getSingleCategory(id),
    getProductsByCategory(id),
  ]);

  const isEmpty = products?.length === 0;
  const title = isEmpty ? "All Products" : (category?.name ?? "Category");

  return (
    <main className="min-h-screen bg-gray-50">
<PageHeader
  icon={
    isEmpty || !category ? (
      <LuPackageOpen />
    ) : (
      <Image src={category.image} alt={category.name} width={44} height={44} className="size-11 rounded object-cover" />
    )
  }
  tag={
    isEmpty
      ? [{ label: title }]
      : [
          { label: "Categories", href: "/categories" },
          { label: title, href: `/categories/${id}` },
          { label: title },
        ]
  }
  title={title}
  description={isEmpty ? "Explore our complete product collection" : `Browse products in ${title}`}
/>

      <div className="mx-auto container px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <LuFuel className="size-4" /> Active Filters:
          </span>
          {!isEmpty && category && (
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-green-700"
            >
              <LuLayers className="size-3" /> {category.name} <LuX className="size-3" />
            </Link>
          )}
          <Link href="/products" className="underline hover:text-gray-900">Clear all</Link>
        </div>

        {!products ? (
          <p className="py-20 text-center text-red-500">Something went wrong.</p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-500">Showing {products.length} products</p>

            {isEmpty ? (
              <div className="flex flex-col items-center py-20 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-gray-100 text-gray-400">
                  <LuPackageOpen className="size-9" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-gray-700">No Products Found</h2>
                <p className="mt-2 text-sm text-gray-500">No products match your current filters.</p>
                <Link
                  href="/products"
                  className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  View All Products
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap">
                {products.map((product) => (
                  <div key={product._id} className="w-full p-3 md:w-1/4 lg:w-1/5">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}