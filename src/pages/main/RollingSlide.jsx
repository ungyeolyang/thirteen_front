import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const infiniteAnimation1 = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const infiniteAnimation2 = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const Wrapper = styled.div`
  * {
    padding: 0;
    margin: 0;
  }

  ul,
  li {
    list-style: none;
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;

  &.original {
    animation: 40s linear infinite normal none running ${infiniteAnimation1};
  }

  &.clone {
    animation: 40s linear infinite ${infiniteAnimation2};
  }

  &.stop {
    animation-play-state: paused;
  }
`;

const SlideItem = styled.li`
  cursor: pointer;
  transition: 0.3s;
  transform: scale(1);
  flex: 0 0 auto;
  width: 330px;
  height: 450px;

  &:hover {
    transform: scale(0.98);
  }
  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
  }
`;

const Item = styled.div`
  width: 350px;
  height: 400px;
  background: ${(props) => `url(${props.src})`} center/contain no-repeat;
  transform: ${(props) => (props.isLandscape ? "rotate(90deg)" : "none")};
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
  }
`;

const RollingSlide = ({ images }) => {
  const [animate, setAnimate] = useState(true);
  const [imageOriented, setImageOriented] = useState([]);

  useEffect(() => {
    const checkImageOrientation = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img.naturalWidth > img.naturalHeight);
        };
      });
    };

    const updateImageOrientations = async () => {
      const orientations = await Promise.all(images.map(checkImageOrientation));
      setImageOriented(orientations);
    };

    updateImageOrientations();
  }, [images]);

  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <Wrapper>
      <SlideContainer>
        <SlideWrapper onMouseEnter={onStop} onMouseLeave={onRun}>
          <Slide className={`slide original ${animate ? "" : "stop"}`}>
            {images.map((src, i) => (
              <SlideItem key={i}>
                <Item src={src} isLandscape={imageOriented[i]} />
              </SlideItem>
            ))}
          </Slide>
          <Slide className={`slide clone ${animate ? "" : "stop"}`}>
            {images.map((src, i) => (
              <SlideItem key={i}>
                <Item src={src} isLandscape={imageOriented[i]} />
              </SlideItem>
            ))}
          </Slide>
        </SlideWrapper>
      </SlideContainer>
    </Wrapper>
  );
};

export default RollingSlide;
