"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductType } from "@/api/types/product.type";
import ProductCard from "../ProductCard/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 border-l-4 border-green-600 pl-3 text-2xl font-bold text-gray-800">
        You May Also <span className="text-green-600">Like</span>
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
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