import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../styles/visual.css";

import { useEffect, useRef, useState } from "react";
import SlideButton from "./ui/SlideButton";
import axios from "axios";
import styled from "@emotion/styled";

const SectionTag = styled.section`
  position: relative;
  padding-top: 30px;
  padding-bottom: 80px;
`;

const InnerArea = styled.div`
  position: relative;
  width: 1280px;
  height: 345px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  position: relative;
  width: 628px;
`;

const SlideLink = styled.a`
  position: relative;
  width: 100%;
  display: block;
  overflow: hidden;
  border-radius: 13px;

  img {
    width: 100%;
  }
`;
export default function Visual() {
  const [visualRes, setVisualRes] = useState([]);

  const GetData = () => {
    axios
      .get("data/visual.json")
      .then((res) => {
        setVisualRes(res.data.visual_slide);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swiperRef = useRef();
  const swiperParams = {
    modules: [Autoplay],
    spaceBetween: 24,
    slidesPerView: 2,
    slidesPerGroup: 1,
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

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <SectionTag>
        <InnerArea>
          <div className="swiper visual-slide">
            <Swiper className="visual-slide" {...swiperParams}>
              {visualRes.map((data, i) => (
                <SwiperSlide className="swiper-slide" key={i}>
                  <SlideItem>
                    <SlideLink href={data.url}>
                      <img src={data.file} alt="이미지가없어요" />
                    </SlideLink>
                  </SlideItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <SlideButton
            swiperRef={swiperRef}
            showPrevButton={true}
            showNextButton={true}
          />
        </InnerArea>
      </SectionTag>
    </>
  );
}
