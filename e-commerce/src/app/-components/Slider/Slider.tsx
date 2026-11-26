"use client";

import { useState } from "react";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { SliderProps } from "@/api/types/slider.type";

const content = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    main: "Shop Now",
    second: "View Deals",
    color: "text-green-600",
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    main: "Shop Now",
    second: "Learn More",
    color: "text-blue-600",
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    main: "Order Now",
    second: "Delivery Info",
    color: "text-violet-600",
  },
];

export default function Slider({
  spaceBetween = 0,
  slidePerview = 1,
  listOfImages,
  heightClass,
  showContent = false,
  showThumbs = false,
}: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (showThumbs) {
    return (
      <div>
        <Swiper
          modules={[FreeMode, Thumbs]}
          spaceBetween={0}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {listOfImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} className="h-full w-full object-contain" alt="" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          freeMode
          watchSlidesProgress
          spaceBetween={12}
          slidesPerView={4}
          className="mt-3 w-full [&_.swiper-slide-thumb-active]:border-[#337ab7]"
        >
          {listOfImages.map((src, index) => (
            <SwiperSlide
              key={index}
              className="h-20! cursor-pointer overflow-hidden rounded-md border-2 border-transparent bg-gray-50"
            >
              <img src={src} className="h-full w-full object-cover" alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      className={`${heightClass} slider-arrows w-full`}
      spaceBetween={spaceBetween}
      slidesPerView={slidePerview}
      navigation
      loop
      pagination={{
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className} w-4! h-4! bg-white! opacity-50!"></span>`;
        },
        bulletActiveClass: "w-8! rounded-full! opacity-100!",
      }}
    >
      {listOfImages.map((src, index) => {
        const slide = content[index % content.length];

        return (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img src={src} className="h-full w-full object-cover" alt="" />

              {showContent && (
                <div className="absolute inset-0 bg-linear-to-r from-green-500/95 to-green-500/50">
                  <div className="container mx-auto flex h-full flex-col justify-center px-20 text-white md:px-24">
                    <h2 className="max-w-lg text-3xl font-bold md:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="mt-4 text-lg">{slide.text}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/products"
                        className={`rounded-lg bg-white px-7 py-3 font-semibold ${slide.color}`}
                      >
                        {slide.main}
                      </Link>
                      <Link
                        href="/products"
                        className="rounded-lg border-2 border-white/60 px-7 py-3 font-semibold hover:bg-white/10"
                      >
                        {slide.second}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}