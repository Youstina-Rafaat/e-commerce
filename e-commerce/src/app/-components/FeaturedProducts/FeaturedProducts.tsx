import { getAllProducts } from "@/api/services/routemisr.service";
import ProductCard from "../ProductCard/ProductCard";

export async function FeaturedProducts() {
  const allProducts = await getAllProducts();

  return (
    <div className="flex flex-wrap">
      {allProducts?.map((product) => (
        <div key={product._id} className="w-full p-3 sm:w-1/2 md:w-1/4 lg:w-1/5">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
