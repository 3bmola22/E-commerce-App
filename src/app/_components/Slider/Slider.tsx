"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({
  spaceBetween = 0,
  slidesPerView = 1,
  listItems,
}: {
  spaceBetween: number;
  slidesPerView: number;
  listItems: string[];
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className} w-[30px]! rounded-md! h-[10px]! bg-white!"></span>`;
        },
      }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      className="h-[400px] relative"
    >
      {listItems.map((img) => {
        return (
          <SwiperSlide key={img}>
            <img src={img} alt={img} className="w-full object-cover h-full" />
          </SwiperSlide>
        );
      })}
      <div className="bg-green-700/75 absolute inset-0 z-2"></div>
    </Swiper>
  );
}
