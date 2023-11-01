/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Recommend() {
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
                  <button className="recommend-cate-bt recommend-cate-bt-active">
                    쎈딜
                  </button>
                </li>
                <li>
                  <button className="recommend-cate-bt">베스트</button>
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
              <div className="swiper recommend-slide">
                <div className="swiper-wrapper"></div>
              </div>
              <button className="recommend-slide-prev"></button>
              <button className="recommend-slide-next"></button>
            </div>
          </div>

          <div className="recommend-footer">
            <button>
              쇼핑 홈 바로가기<span className="footer-bt-img"></span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
