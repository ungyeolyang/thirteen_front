import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 850px; /* 차트의 최대 너비 */
  height: auto;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  text-align: center;
  h2 {
    font-size: 30px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  background-color: #ff5c5c;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ff3232;
  }
`;

const StockModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{title}</h2>
        {children}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StockModal;
