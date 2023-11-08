/* eslint-disable no-template-curly-in-string */
import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/recommend.css";
import SlideButton from "./SlideButton";
import axios from "axios";
import ContentFooter from "./ContentFooter";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Recommend() {
  const [recommendRes, setRecommendRes] = useState([]);
  const [recommenTotalRes, setRecommendTotalRes] = useState();
  const [activeCategory, setActiveCategory] = useState("쎈딜");

  const GetData = () => {
    axios
      .get("/data/recommend.json")
      .then((res) => {
        setRecommendTotalRes(res.data);
        setRecommendRes(res.data.recommend_slide);
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

  const btClicked = (category, data) => {
    setActiveCategory(category);
    setRecommendRes(data);
    swiperRef.current.slideTo(0, 0);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <section className="recommend">
        <div className="recommend-inner">
          <div className="recommend-header">
            <h2 className="recommend-title">쇼핑 추천</h2>
            <span className="recommend-txt">
              할인이 쎄다! 지금, 특가 상품을 확인하세요.
            </span>
            <div className="recommend-category">
              <ul className="recommend-list">
                <li>
                  <button
                    className={
                      activeCategory === "쎈딜"
                        ? "recommend-cate-bt recommend-cate-bt-active"
                        : "recommend-cate-bt"
                    }
                    onClick={() =>
                      btClicked("쎈딜", recommenTotalRes.recommend_slide)
                    }
                  >
                    쎈딜
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeCategory === "베스트"
                        ? "recommend-cate-bt recommend-cate-bt-active"
                        : "recommend-cate-bt"
                    }
                    onClick={() =>
                      btClicked("베스트", recommenTotalRes.recommend_slide_best)
                    }
                  >
                    베스트
                  </button>
                </li>
                <li>
                  <button className="recommend-cate-bt">블프데이</button>
                </li>
                <li>
                  <button className="recommend-cate-bt">디지털프라자</button>
                </li>
                <li>
                  <a href="#" className="recommend-cate-bt">
                    소담상회
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="recommend-main">
            <div className="recommend-slide-wrap">
              <Swiper className="recommend-slide" {...swiperParams}>
                {recommendRes.map((data, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div className="recommend-slide-item">
                      <a className="recommend-link" href={data.url}>
                        <div className="recommend-img">
                          <img src={data.file} alt={data.url} />
                        </div>
                        <div className="recommend-info">
                          <ul>
                            <li>
                              <span className="recommend-good-info-price">
                                <b>
                                  {data.discount === 0
                                    ? ""
                                    : data.discount + "%"}
                                </b>
                                <em>
                                  {data.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  원
                                </em>
                              </span>
                            </li>
                            <li>
                              <p className="recommend-good-info-desc">
                                {data.prodName}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <SlideButton
                swiperRef={swiperRef}
                showPrevButton={showPrevButton}
                showNextButton={showNextButton}
              />
            </div>
          </div>
          <ContentFooter name="쇼핑" />
        </div>
      </section>
    </>
  );
}
