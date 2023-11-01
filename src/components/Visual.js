import "../styles/visual.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import json from "../data/visual.json";

export default function Visual() {
  const VisualRes = json.visual_slide;
  // console.log(VisualRes);
  return (
    <>
      <section className="visual">
        <div className="visual-inner">
          <div className="swiper visual-slide">
            <Swiper
              className="visual-slide"
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={2}
              loop={true}
              speed={500}
              autoplay={{
                delay: 500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".visual-slide-next",
                prevEl: ".visual-slide-prev",
              }}
            >
              {VisualRes.map((data, i) => (
                <SwiperSlide className="swiper-slide" key={i}>
                  <div className="visual-slide-item">
                    <a href={data.url}>
                      <img src={data.file} alt="이미지가없어요" />
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button className="visual-slide-prev"></button>
          <button className="visual-slide-next"></button>
        </div>
      </section>
    </>
  );
}
