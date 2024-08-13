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
  width: 60%;
  height: 500px;
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
  width: 90%;
  height: 80%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const CardImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 70%;
  border-radius: 150px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: #ccc;
`;

const ModalText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 100%;
  padding: 0 15px;
`;

const ModalImage = styled.img`
  width: ${({ rotate }) => (rotate !== 0 ? "338px" : "208px")};
  height: ${({ rotate }) => (rotate !== 0 ? "208px" : "338px")};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: transform 0.3s ease;
`;

const CloseButton = styled.button`
  background: none;
  color: white;
  width: 5%;
  height: 100%;
  font-size: 60px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #c14e4e;
  }
`;

const CardModal = ({ card, onClose }) => {
  const imgRef = useRef(null);
  const [rotate, setRotate] = useState(0);

  const rpad = (str, length, padString) => {
    while (str.length < length) {
      str += padString;
    }
    return str;
  };
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
            <p>연회비: {card.annualfee}</p>
            <p>{card.performance}</p>
            <p>{card.benefits}</p>
          </ModalText>
        </CardBox>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardModal;
