import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/event.css";
import SlideButton from "./ui/SlideButton";
import { Autoplay } from "swiper/modules";
import axios from "axios";

const Event = () => {
  const [eventRes, setEventRes] = useState([]);

  const GetData = () => {
    axios
      .get("/data/event.json")
      .then((res) => {
        setEventRes(res.data.event_slide);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swiperRef = useRef();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const swiperParams = {
    modules: [Autoplay],
    spaceBetween: 27,
    slidesPerView: 4,
    slidesPerGroup: 4,
    loop: true,
    speed: 800,
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
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
    <section className="event">
      <div className="event-inner">
        <div className="event-header">
          <h2 className="event-title">이벤트</h2>
          <span className="event-txt">
            인터파크에서 할인혜택을 꼭 챙기세요.
          </span>
        </div>
        <div className="event-main">
          <div className="event-slide-wrap">
            <div className="swiper event-slide">
              <Swiper className="swiper-wrapper" {...swiperParams}>
                {eventRes.map((data, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div className="event-slide-item">
                      <a className="event-link" href={data.url}>
                        <div className="event-img">
                          <img src={data.file} alt={data.url} />
                        </div>
                      </a>
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
      </div>
    </section>
  );
};

export default Event;
