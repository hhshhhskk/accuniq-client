import "../styles/common.css";

export default function SlideButton({
  swiperRef,
  showPrevButton,
  showNextButton,
}) {
  return (
    <>
      <button
        className="slide-prev"
        style={{
          display: showPrevButton ? "block" : "none",
        }}
        onClick={() => {
          swiperRef.current.slidePrev();
        }}
      ></button>
      <button
        className="slide-next"
        style={{
          display: showNextButton ? "block" : "none",
        }}
        onClick={() => {
          swiperRef.current.slideNext();
        }}
      ></button>
    </>
  );
}
