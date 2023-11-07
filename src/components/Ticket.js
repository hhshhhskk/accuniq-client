import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/ticket.css";
import SlideButton from "./SlideButton";
import ContentFooter from "./ContentFooter";

const Ticket = () => {
  const [ticketRes, setTicketRes] = useState([]);
  const [ticketTotalRes, setTicketTotalRes] = useState({});
  const GetData = () => {
    axios
      .get("/data/ticket.json")
      .then((res) => {
        // console.log(res);
        setTicketRes(res.data.ticket_slide);
        setTicketTotalRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const swiperRef = useRef();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const swiperParams = {
    spaceBetween: 28,
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
    <>
      <section className="ticket">
        <div className="ticket-inner">
          <div className="ticket-header">
            <h2 className="ticket-title">티켓 랭킹</h2>
            <span className="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
          </div>
          <div className="ticket-main">
            <div className="ticket-category">
              <ul className="ticket-list">
                <li>
                  <button className="ticket-cate-bt ticket-cate-bt-active">
                    뮤지컬
                  </button>
                </li>
                <li>
                  <button className="ticket-cate-bt">콘서트</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">스포츠</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">전시/행사</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">클래식/무용</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">아동/가족</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">연극</button>
                </li>
                <li>
                  <button className="ticket-cate-bt">레저/캠핑</button>
                </li>
              </ul>
            </div>
            <div className="ticket-slide-wrap">
              <div className="swiper ticket-slide">
                <Swiper className="swiper-wrapper" {...swiperParams}>
                  {ticketRes.map((data, i) => (
                    <SwiperSlide className="swiper-slide" key={i}>
                      <div className="ticket-slide-item">
                        <a className="ticket-link" href={data.url}>
                          <div className="ticket-img">
                            <img src={data.file} alt={data.url} />
                            <div className="ticket-img-num">{i + 1}</div>
                          </div>
                          <div className="ticket-info">
                            <ul>
                              <li>
                                <div className="ticket-info-title">
                                  <b>{data.title}</b>
                                </div>
                              </li>
                              <li>
                                <div className="ticket-info-place">
                                  {data.place}
                                </div>
                              </li>
                              <li>
                                <div className="ticket-info-duration">
                                  {data.duration}
                                </div>
                              </li>
                              <li>
                                {data.babge === "좌석우위" ? (
                                  <div className="ticket-info-babge1">
                                    {data.babge}
                                  </div>
                                ) : data.babge === "단독판매" ? (
                                  <div className="ticket-info-babge2">
                                    {data.babge}
                                  </div>
                                ) : null}
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                  {ticketTotalRes.total === ticketRes.length ? (
                    <SwiperSlide className="swiper-slide">
                      <div className="ticket-slide-item">
                        <div className="ticket-slide-total">
                          <img
                            src={ticketTotalRes.total_img.file}
                            alt={ticketTotalRes.total_img.url}
                          />
                          <div className="ticket-total-txt">전체보기</div>
                        </div>
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
          <ContentFooter name="티켓" />
        </div>
      </section>
    </>
  );
};

export default Ticket;
