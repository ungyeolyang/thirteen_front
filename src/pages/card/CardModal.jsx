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
  width: 50%;
  height: 600px;
  gap: 25px;

  @media (max-width: 1024px) {
    width: 90%;
    overflow: hidden;
    overflow-y: auto;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 70px;
  color: white;
  background: #007bff;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  div {
    position: absolute;
  }
`;

const CardBox = styled.div`
  width: 100%;
  min-height: 430px;
  max-height: 430px;
  height: 45%;
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

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: center;
`;
const ModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: white;
  width: 100px;
  height: 100%;
  font-size: 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: #c14e4e;
  }
`;

const BenefitsBox = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  align-items: center;
  overflow-y: auto;
`;

const BoldText = styled.span`
  font-weight: bold;
  font-size: 22px;
`;

const BenefitItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 5px 0;
  padding: 10px;
  gap: 10px;
  font-size: 20px;
  /* background-color: ${({ color }) => color || "#f80202"}; */
  border-radius: 5px;
  width: 100%;
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

  const renderBenefits = () => {
    return card.benefits.split(", ").map((benefit, index) => {
      const [category, details] = benefit.split(" (");
      return (
        <BenefitItem key={index}>
          <BoldText>{category.trim()}</BoldText>
          {details?.replace(")", "")}
        </BenefitItem>
      );
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Line>
          <Title>{card.cname}</Title>
          <CloseButton onClick={onClose}>
            <RiCloseCircleLine />
          </CloseButton>
        </Line>
        <CardDiv>
          <CardBox>
            <CardImg>
              <ModalImage ref={imgRef} src={card.cimage} rotate={rotate} />
            </CardImg>
            <ModalText>
              <BenefitsBox>{renderBenefits()}</BenefitsBox>
            </ModalText>
          </CardBox>
          <Footer>
            <div>연회비 : {card.annualfee} , </div>
            <div>기준실적 : {card.performance}</div>
          </Footer>
        </CardDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardModal;
