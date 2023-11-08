/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import ContentFooter from "./ui/ContentFooter";
import SlideButton from "./ui/SlideButton";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/live.css";

const Live = () => {
  const [liveRes, setLiveRes] = useState([]);
  const [liveTotalRes, setLiveTotalRes] = useState({});
  const GetData = () => {
    axios
      .get("/data/live.json")
      .then((res) => {
        setLiveRes(res.data.live_slide);
        setLiveTotalRes(res.data);
        // console.log(res.data.live_slide);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const swiperRef = useRef();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const swiperParams = {
    spaceBetween: 27,
    slidesPerView: 4,
    slidesPerGroup: 4,
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
    <section className="live">
      <div className="live-inner">
        <div className="live-header">
          <img src="/images/title_live.svg" alt="" />
        </div>
        <div className="live-main">
          <div className="live-slide-wrap">
            <div className="swiper live-slide">
              <Swiper className="swiper-wrapper" {...swiperParams}>
                {liveRes.map((data, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div className="live-slide-item">
                      <a className="live-link" href={data.live_info.url}>
                        <div className="live-img">
                          <img
                            src={data.live_info.file}
                            alt={data.live_info.url}
                          />
                        </div>
                        <div className="live-slide-overlay">
                          <div className="live-info-top">
                            <div className="live-babge">
                              {data.live_info.babge}
                            </div>
                            <div className="live-name">
                              {data.live_info.name}
                            </div>
                          </div>
                          <div className="live-info-mid">
                            <div className="live-day">{data.live_day.day}</div>
                            <div className="live-time">
                              {data.live_day.time}
                            </div>
                          </div>
                          <div className="live-info-bottom">
                            <div className="live-bot-img">
                              <img
                                src={data.live_bottom.bot_img}
                                alt="이미지 없음"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                            <div className="live-bot-text">
                              <div className="live-bot-title">
                                {data.live_bottom.bot_title}
                              </div>
                              <div className="live-bot-num">
                                <div className="live-bot-discount">
                                  {data.live_bottom.bot_discount &&
                                    data.live_bottom.bot_discount + "%"}
                                </div>
                                <div className="live-bot-price">
                                  {data.live_bottom.bot_price &&
                                    data.live_bottom.bot_price + "원"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
                {liveTotalRes.total === liveRes.length ? (
                  <SwiperSlide className="swiper-slide">
                    <div className="live-slide-item">
                      <a className="live-link">
                        <img
                          src={liveTotalRes.shortcuts_bg.file}
                          alt={liveTotalRes.shortcuts_bg.url}
                        />
                        <div className="live-slide-overlay">
                          <div className="live-slide-shortcut">
                            <div className="live-slide-logo">
                              <img
                                src={liveTotalRes.shortcuts_logo.file}
                                alt={liveTotalRes.shortcuts_logo.url}
                              />
                            </div>
                            <div className="live-total-txt">
                              방송준비중입니다.
                            </div>
                            <div className="live-total-bt">편성표 바로가기</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ) : null}
              </Swiper>
            </div>
            <SlideButton
              swiperRef={swiperRef}
              showPrevButton={showPrevButton}
              showNextButton={showNextButton}
            />
          </div>
        </div>
        <ContentFooter name="라이브" />
      </div>
    </section>
  );
};

export default Live;
