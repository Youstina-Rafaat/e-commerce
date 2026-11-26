import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuFolderOpen } from "react-icons/lu";
import { getCategorySubcategories } from "@/actions/subcategory.action";
import { getSingleCategory } from "@/api/services/routemisr.service";
export default async function SubcategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, subcategories] = await Promise.all([
    getSingleCategory(id),
    getCategorySubcategories(id),
  ]);
  const title = category?.name ?? "Category";

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-400 text-white">
        <div className="mx-auto container px-4 py-10">
          <nav className="mb-6 flex gap-2 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/categories" className="text-white/70 hover:text-white">Categories</Link>
            <span className="text-white/40">/</span>
            <span className="font-medium">{title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-white/20 shadow-lg">
              {category ? (
                <Image src={category.image} alt={category.name} width={44} height={44} className="size-11 rounded object-cover" />
              ) : (
                <LuFolderOpen className="size-8" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-white/80">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto container px-4 py-8">
        <Link href="/categories" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600">
          <LuArrowLeft className="size-4" /> Back to Categories
        </Link>

        {!subcategories ? (
          <p className="py-20 text-center text-red-500">Something went wrong.</p>
        ) : subcategories.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <p>No subcategories found.</p>
            <Link href={`/categories/${id}/products`} className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
              View {title} Products
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-lg font-bold text-gray-700">
              {subcategories.length} Subcategories in {title}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {subcategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/subcategories/${sub._id}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-green-50 text-green-600">
                    <LuFolderOpen className="size-6" />
                  </span>
                  <h3 className="mt-4 font-semibold text-gray-700 group-hover:text-green-600">{sub.name}</h3>
                  <span className="mt-2 flex items-center gap-2 text-sm text-green-600 opacity-0 transition group-hover:opacity-100">
                    Browse Products <LuArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}