import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/visual.css";

import json from "../data/visual.json";
import { useRef } from "react";
import SlideButton from "./SlideButton";

export default function Visual() {
  const VisualRes = json.visual_slide;
  // console.log(VisualRes);

  const swiperRef = useRef();
  const swiperParams = {
    modules: [Autoplay],
    spaceBetween: 24,
    slidesPerView: 2,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
  };
  return (
    <>
      <section className="visual">
        <div className="visual-inner">
          <div className="swiper visual-slide">
            <Swiper className="visual-slide" {...swiperParams}>
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
          <SlideButton
            swiperRef={swiperRef}
            showPrevButton={true}
            showNextButton={true}
          />
        </div>
      </section>
    </>
  );
}
