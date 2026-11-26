import { ProductType } from "@/api/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from "../WishlistBtn/WishlistBtn";
import { LuEye, LuRefreshCw, LuStar } from "react-icons/lu";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  const finalPrice = hasDiscount ? product.priceAfterDiscount : product.price;

  const actionBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 shadow-sm transition hover:text-green-600";

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-lg">
      {hasDiscount && (
        <span className="absolute start-4 top-4 z-10 rounded-md bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
          -{discountPercent}%
        </span>
      )}

      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />

        <div className="absolute end-1 top-1 flex flex-col gap-3">
          <WishlistBtn id={product._id} className={actionBtn} />
          <button type="button" aria-label="Compare" className={actionBtn}>
            <LuRefreshCw className="h-5 w-5" />
          </button>
          <Link href={`/productdetails/${product._id}`} className={actionBtn}>
            <LuEye className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <span className="text-sm text-gray-500">{product.category?.name}</span>

        <h3 className="mt-1 line-clamp-1 text-lg font-medium text-gray-700">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <LuStar
                key={i}
                className={`h-4 w-4 ${
                  product.ratingsAverage >= i - 0.5
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-yellow-400"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-800">
              {finalPrice} EGP
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <AddBtn id={product._id} styles="h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white cursor-pointer hover:bg-green-700 disabled:opacity-70" word="+" />
        </div>
      </div>
    </div>
  );
}