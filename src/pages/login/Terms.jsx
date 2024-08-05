import { useState } from "react";
import styled from "styled-components";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../component/Button";

const TermBox = styled.div`
  overflow-y: scroll;
  border: 3px solid black;
  padding: 10px;
  width: 300px;
  height: 130px;
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  position: relative;
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  gap: 20px;

  label {
    height: 100%;
    display: flex;
    align-items: center;
  }

  div {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
  }
  svg {
    cursor: pointer;
  }
`;

const Terms = ({
  setIsAgree,
  setModalOpen,
  setHeader,
  checkedItems,
  setCheckedItems,
}) => {
  const onChangeAll = (e) => {
    const { checked } = e.target;
    setCheckedItems({
      all: checked,
      essential1: checked,
      essential2: checked,
    });
  };

  const onChangeCheck = (e) => {
    const { id, checked } = e.target;
    setCheckedItems((prev) => {
      const updatedItems = {
        ...prev,
        [id]: checked,
      };

      const allChecked = updatedItems.essential1 && updatedItems.essential2;
      return {
        ...updatedItems,
        all: allChecked,
      };
    });
  };

  const onClickTerm = () => {
    setModalOpen(true);
    setHeader("서비스 이용약관");
  };
  const onClickCollectTerm = () => {
    setModalOpen(true);
    setHeader("개인정보 수집 및 이용약관");
  };

  return (
    <>
      <Div>
        <label for="all">
          {checkedItems.all ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="all"
          checked={checkedItems.all}
          onChange={onChangeAll}
          hidden
        />
        <label for="all">전체 동의하기</label>
      </Div>
      <Div>
        <label for="essential1">
          {checkedItems.essential1 ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="essential1"
          checked={checkedItems.essential1}
          onChange={onChangeCheck}
          hidden
        />
        <label for="essential1">[필수] 서비스 이용약관 동의</label>
        <div onClick={onClickTerm}>
          <IoIosArrowForward />
        </div>
      </Div>
      <Div>
        <label for="essential2">
          {checkedItems.essential2 ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="essential2"
          checked={checkedItems.essential2}
          onChange={onChangeCheck}
          hidden
        />
        <label for="essential2">[필수] 개인정보 수집 및 이용 동의</label>
        <div onClick={onClickCollectTerm}>
          <IoIosArrowForward />
        </div>
      </Div>
      <Button
        disabled={!(checkedItems.essential1 & checkedItems.essential2)}
        onClick={() => setIsAgree(true)}
      >
        다음
      </Button>
    </>
  );
};
export default Terms;
