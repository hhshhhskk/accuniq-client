import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "../styles/tour.css";

import SlideButton from "./SlideButton";
import axios from "axios";
import ContentFooter from "./ContentFooter";
const Tour = () => {
  const [tourRes, setTourRes] = useState([]);

  const GetData = () => {
    axios
      .get("/data/tour.json")
      .then((res) => {
        setTourRes(res.data.tour_slide);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const swiperRef = useRef();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const swiperParams = {
    spaceBetween: 24,
    slidesPerView: 3,
    slidesPerGroup: 3,
    speed: 500,
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
    onSlideChange: (swiper) => {
      if (swiper.isBeginning) {
        setShowPrevButton(false);
        setShowNextButton(true);
      } else if (swiper.isEnd) {
        setShowPrevButton(true);
        setShowNextButton(false);
      } else {
        setShowPrevButton(true);
        setShowNextButton(true);
      }
    },
  };
  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <section className="tour">
        <div className="tour-inner">
          <div className="tour-header">
            <h2 className="tour-title">투어 특가</h2>
            <span className="tour-txt">해외여행은 인터파크다</span>
          </div>
          <div className="tour-main">
            <div className="tour-category">
              <ul className="tour-list">
                <li>
                  <button className="tour-cate-bt tour-cate-bt-active">
                    망설이면 품절
                  </button>
                </li>
                <li>
                  <button className="tour-cate-bt">패키지</button>
                </li>
                <li>
                  <button className="tour-cate-bt">국내숙소</button>
                </li>
                <li>
                  <button className="tour-cate-bt">해외숙소</button>
                </li>
              </ul>
            </div>
            <div className="tour-slide-wrap">
              <div className="swiper tour-slide">
                <Swiper className="swiper-wrapper" {...swiperParams}>
                  {tourRes.map((data, i) => (
                    <SwiperSlide className="swiper-slide" key={i}>
                      <div className="tour-slide-item">
                        <a href={data.url}>
                          <img src={data.file} alt={data.url} />
                        </a>
                        <div className="tour-slide-info">
                          <div className="tour-itemBadge">{data.babge}</div>
                          <div className="tour-itemBenefit">{data.benefit}</div>
                          <div className="tour-itemName">{data.name}</div>
                          <div className="tour-itemPrice">
                            {data.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <SlideButton
                swiperRef={swiperRef}
                showPrevButton={showPrevButton}
                showNextButton={showNextButton}
              />
            </div>
          </div>
          <ContentFooter name="투어" />
        </div>
      </section>
    </>
  );
};

export default Tour;
