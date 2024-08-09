import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Modal from "../component/Modal";
import CollectTerm from "../pages/login/CollectTerm";
import Term from "../pages/login/Term";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  background: #1b2046;
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 20px 5%;
`;
const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;
const Line = styled.div`
  display: flex;
  gap: 10px;
`;
const Hover = styled.div`
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
const Footer = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [header, setHeader] = useState("");
  const onClickTerm = () => {
    setModalOpen(true);
    setHeader("서비스 이용약관");
  };
  const onClickCollectTerm = () => {
    setModalOpen(true);
    setHeader("개인정보 수집 및 이용약관");
  };
  const contents = () => {
    if (header.includes("개인정보")) {
      return <CollectTerm />;
    } else return <Term />;
  };

  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/my")
  ) {
    return null;
  }

  return (
    <>
      <StyledFooter>
        <FooterBox>
          <Line>
            <Hover onClick={onClickTerm}>이용약관 </Hover> |
            <Hover onClick={onClickCollectTerm}> 개인정보 취급방침</Hover>
          </Line>
          <p>(주) 일공이오</p>
          <Line>양웅열 | 이혜원 | 서용욱 | 이하림 | 안준영</Line>
          <p>주소:서울특별시 강남구 역삼로</p>
          <p>전화번호 02-123-4567</p>
          <p>이메일 : annaidle99@gmail.com</p>
          <p>CopyRight © 2024 일공이오 All Rights Reserved.</p>
        </FooterBox>
      </StyledFooter>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        header={header}
        no={"확인"}
      >
        {contents()}
      </Modal>
    </>
  );
};
export default Footer;
