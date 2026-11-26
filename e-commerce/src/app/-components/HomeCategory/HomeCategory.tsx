import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { getAllCategories } from "@/api/services/routemisr.service";
import SectionTitle from "../SectionTitle/SectionTitle";

export default async function HomeCategory() {
  const allCategories = await getAllCategories();

  return (
    <section className="mx-auto container px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <SectionTitle text="Shop By" highlight="Category" />
        <Link href="/categories" className="flex items-center gap-2 font-medium text-green-600 hover:text-green-700">
          View All Categories <LuArrowRight />
        </Link>
      </div>

      <div className="flex flex-wrap">
        {allCategories?.map((category) => (
          <div key={category._id} className="w-1/2 p-3 md:w-1/3 lg:w-1/6">
            <Link
              href={`/categories/${category._id}`}
              className="group flex h-full flex-col items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <img src={category.image} className="size-20 rounded-full object-cover" alt={category.name} />
              <h3 className="text-center font-medium text-gray-700 group-hover:text-green-600">{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}