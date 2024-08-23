import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { RiCloseCircleLine } from "react-icons/ri";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #f1f1f1;
  position: relative;
  display: flex;

  justify-content: start;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  width: 70%;
  height: 600px;

  @media (max-width: 1024px) {
    width: 90%;
    overflow: hidden;
    overflow-y: auto;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 60px;
  background: #007bff;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const CardBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 10px;
    flex-direction: column;
  }
`;

const CardImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: #ccc;

  @media (max-width: 1024px) {
    box-shadow: none;
    background: none;
  }
`;

const ModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex-direction: column;
  width: 60%;
  text-align: center;
  height: 100%;
  padding: 0 15px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: start;
  }
`;

const ModalImage = styled.img`
  width: ${({ rotate }) => (rotate !== 0 ? "338px" : "208px")};
  height: ${({ rotate }) => (rotate !== 0 ? "208px" : "338px")};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ rotate }) => (rotate !== 0 ? "208px" : "128px")};
    height: ${({ rotate }) => (rotate !== 0 ? "128px" : "208px")};
  }
`;

const CloseButton = styled.button`
  background: none;
  color: white;
  width: 100px;
  height: 100%;
  font-size: 60px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #c14e4e;
  }
`;

const BenefitsBox = styled.div`
  width: 100%;
  height: 40%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  align-items: center;
  overflow-y: auto;
`;

const CardModal = ({ card, onClose }) => {
  const imgRef = useRef(null);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const img = imgRef.current;

    if (img) {
      img.onload = () => {
        const isLandscape = img.naturalWidth > img.naturalHeight;
        setRotate(isLandscape ? 90 : 0);
      };
    }
  }, [card.cimage]);

  return (
    <ModalOverlay>
      <ModalContent>
        <Line>
          <CloseButton onClick={onClose}>
            <RiCloseCircleLine />
          </CloseButton>
        </Line>
        <CardBox>
          <CardImg>
            <ModalImage ref={imgRef} src={card.cimage} rotate={rotate} />
          </CardImg>
          <ModalText>
            <h2>{card.cname}</h2>
            <p>연회비 : {card.annualfee}</p>
            <p>기준실적 : {card.performance}</p>
            <BenefitsBox>
              <p>
                {card.benefits
                  .replace(/,/g, " ") // 쉼표 제거
                  .split(")") // ')' 기호로 문자열 분할
                  .filter(Boolean) // 빈 문자열 제거
                  .map((benefit, index) => (
                    <span key={index}>
                      {benefit.trim()}
                      {index < card.benefits.split(")").length - 1 && (
                        <br />
                      )}{" "}
                      {/* 마지막 항목에는 줄바꿈을 적용하지 않음 */}
                    </span>
                  ))}
              </p>
            </BenefitsBox>
          </ModalText>
        </CardBox>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardModal;
