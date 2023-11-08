import styled from "@emotion/styled";
import "../../styles/common.css";

const BtSlidePrev = styled.button`
  position: absolute;
  display: ${(props) => (props.showBt ? "block" : "none")};
  top: 50%;
  left: 0;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.13);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;

  ::before {
    content: "";
    position: relative;
    width: 10px;
    height: 18px;
    display: block;
    margin: 0 auto;
    background: url("/images/slider_arrow.svg") no-repeat center;
    /* rotate 돌리기 , deg -> "각도" */
    transform: rotateY(180deg);
  }
`;

const BtSlideNext = styled.button`
  position: absolute;
  display: ${(props) => (props.showBt ? "block" : "none")};
  top: 50%;
  right: 0;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.13);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transform: translateX(50%) translateY(-50%);
  border-radius: 50%;

  ::before {
    content: "";
    position: relative;
    width: 10px;
    height: 18px;
    display: block;
    margin: 0 auto;
    background: url("/images/slider_arrow.svg") no-repeat center;
  }
`;

export default function SlideButton({
  swiperRef,
  showPrevButton,
  showNextButton,
}) {
  return (
    <>
      <BtSlidePrev
        className="slide-prev"
        showBt={showPrevButton}
        onClick={() => {
          swiperRef.current.slidePrev();
        }}
      ></BtSlidePrev>
      <BtSlideNext
        className="slide-next"
        showBt={showNextButton}
        onClick={() => {
          swiperRef.current.slideNext();
        }}
      ></BtSlideNext>
    </>
  );
}
