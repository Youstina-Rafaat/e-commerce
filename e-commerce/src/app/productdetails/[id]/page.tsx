import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSingleProduct,
  getRelatedProducts,
} from "@/api/services/routemisr.service";
import Slider from "@/app/-components/Slider/Slider";
import ProductTabs from "@/app/-components/ProductTabs/ProductTabs";
import RelatedProducts from "@/app/-components/RelatedProducts/RelatedProducts";
import WishlistBtn from "@/app/-components/WishlistBtn/WishlistBtn";
import ProductPurchase from "@/app/-components/ProductPurchase/ProductPurchase";
import {
  LuChevronRight,
  LuRotateCcw,
  LuShare2,
  LuShieldCheck,
  LuStar,
  LuTruck,
} from "react-icons/lu";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const singleProduct = await getSingleProduct(id);

  if (!singleProduct) notFound();

  const hasDiscount =
    singleProduct.priceAfterDiscount &&
    singleProduct.priceAfterDiscount < singleProduct.price;
  const finalPrice = hasDiscount
    ? singleProduct.priceAfterDiscount!
    : singleProduct.price;

  const inStock = singleProduct.quantity > 0;
  const images = [singleProduct.imageCover, ...(singleProduct.images ?? [])];

  const related = singleProduct.category?._id
    ? ((await getRelatedProducts(singleProduct.category._id)) ?? []).filter(
        (p) => p._id !== id,
      )
    : [];

  const perks = [
    { icon: <LuTruck />, title: "Free Delivery", text: "Orders over 500 EGP" },
    { icon: <LuRotateCcw />, title: "30 Days Returns", text: "Hassle-free returns" },
    { icon: <LuShieldCheck />, title: "Secure Payment", text: "100% protected" },
  ];

  return (
    <section className="mx-auto container px-4 py-8">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-600">
          Home
        </Link>
        <LuChevronRight className="h-4 w-4" />
        <span>{singleProduct.category?.name}</span>
        {singleProduct.subcategory?.[0] && (
          <>
            <LuChevronRight className="h-4 w-4" />
            <span>{singleProduct.subcategory[0].name}</span>
          </>
        )}
        <LuChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-800">{singleProduct.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 lg:col-span-4">
          <Slider listOfImages={images} heightClass="h-96" showThumbs />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              {singleProduct.category?.name}
            </span>
            {singleProduct.brand?.name && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {singleProduct.brand.name}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <LuStar
                  key={i}
                  className={`h-4 w-4 text-yellow-400 ${
                    singleProduct.ratingsAverage >= i - 0.5
                      ? "fill-yellow-400"
                      : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {singleProduct.ratingsAverage} ({singleProduct.ratingsQuantity}{" "}
              reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-800">
              {finalPrice} EGP
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {singleProduct.price} EGP
              </span>
            )}
          </div>

          <span
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
              inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

          <hr className="my-6 border-gray-100" />

          <p className="text-gray-600">{singleProduct.description}</p>

          <ProductPurchase
            id={id}
            finalPrice={finalPrice}
            available={singleProduct.quantity}
          />

          <div className="mt-3 flex gap-3">
            <WishlistBtn
              id={id}
              showLabel
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 text-sm font-medium text-gray-600 transition hover:border-green-600 hover:text-green-600"
            />
            <button
              type="button"
              aria-label="Share"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-green-600 hover:text-green-600"
            >
              <LuShare2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                  {perk.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {perk.title}
                  </p>
                  <p className="text-xs text-gray-500">{perk.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductTabs
        description={singleProduct.description}
        category={singleProduct.category?.name}
        subcategory={singleProduct.subcategory?.[0]?.name}
        brand={singleProduct.brand?.name}
        sold={singleProduct.sold}
        ratingsAverage={singleProduct.ratingsAverage}
        ratingsQuantity={singleProduct.ratingsQuantity}
      />

      {related.length > 0 && <RelatedProducts products={related} />}
    </section>
  );
}