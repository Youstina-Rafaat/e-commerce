"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductType } from "@/api/types/product.type";
import ProductCard from "../ProductCard/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const arrowBtn =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-slate-600 transition hover:bg-gray-200 [&.swiper-button-disabled]:cursor-default [&.swiper-button-disabled]:opacity-40";

export default function RelatedProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="border-l-4 border-green-600 pl-3 text-2xl font-bold text-gray-800">
          You May Also <span className="text-green-600">Like</span>
        </h2>

        <div className="flex gap-2">
          <button type="button" aria-label="Previous" className={`related-prev ${arrowBtn}`}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1 2 8l6 7" />
            </svg>
          </button>
          <button type="button" aria-label="Next" className={`related-next ${arrowBtn}`}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 1 6 7-6 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: ".related-prev", nextEl: ".related-next" }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="h-auto!">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}