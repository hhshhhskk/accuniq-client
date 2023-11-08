import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/book.css";
import SlideButton from "./SlideButton";
import axios from "axios";
import ContentFooter from "./ContentFooter";

const Book = () => {
  const [bookRes, setBookRes] = useState([]);

  const GetData = () => {
    axios
      .get("/data/book.json")
      .then((res) => {
        setBookRes(res.data.book_slide);
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
    slidesPerView: 5,
    slidesPerGroup: 5,
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
    <section className="book">
      <div className="book-inner">
        <div className="book-header">
          <h2 className="book-title">오늘의 도서</h2>
          <span className="book-txt">지금 읽기 딱 좋은 책, 놓치지 마세요!</span>
        </div>
        <div className="book-main">
          <div className="book-category">
            <ul className="book-list">
              <li>
                <button className="book-cate-bt book-cate-bt-active">
                  MD's Pick
                </button>
              </li>
              <li>
                <button className="book-cate-bt">베스트셀러</button>
              </li>
              <li>
                <button className="book-cate-bt">신간추천</button>
              </li>
              <li>
                <button className="book-cate-bt">특가할인</button>
              </li>
            </ul>
          </div>
          <div className="book-slide-wrap">
            <div className="swiper book-slide">
              <Swiper className="swiper-wrapper" {...swiperParams}>
                {bookRes.map((data, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div className="book-slide-item">
                      <a className="book-link" href={data.url}>
                        <div className="book-img">
                          <img src={data.file} alt={data.url} />
                        </div>
                        <div className="book-info">
                          <ul>
                            <li>
                              <div className="book-info-title">
                                {data.title}
                              </div>
                            </li>
                            <li>
                              <div className="book-info-price">
                                {data.price}
                              </div>
                            </li>
                          </ul>
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
        <ContentFooter name="도서" />
      </div>
    </section>
  );
};

export default Book;
