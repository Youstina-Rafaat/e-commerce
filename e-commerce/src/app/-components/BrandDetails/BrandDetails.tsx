import { getProductsByBrand } from "@/actions/brand.action";
import ProductCard from "../ProductCard/ProductCard";

export async function BrandDetails({ brandId }: { brandId: string }) {
  const products = await getProductsByBrand(brandId);

  if (!products) {
    return <p className="py-20 text-center text-red-500">Something went wrong.</p>;
  }

  if (products.length === 0) {
    return <p className="py-20 text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <div key={product._id} className="w-full p-3 md:w-1/4 lg:w-1/5">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}