import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { FaCircleUser } from "react-icons/fa6";
import LogoImg from "../image/LogoGreen-removebg-preview.png";
import Common from "../utils/Common";
import Modal from "../component/Modal";
import BoardModalContent from "../pages/admin/BoardModalContent";
import BoardApi from "../api/BoardAxiosApi";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md"; //<MdLogout />
import { CiCirclePlus } from "react-icons/ci";

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 20vh;
`;

const HeadBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  width: 300px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const MyBox = styled.div`
  position: fixed;
  right: 1%;
  cursor: pointer;
  width: 200px;
  border-radius: 30px;
  height: 100px;
  background: none;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3f3f;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    right: ${(props) => (props.expanded ? "0" : "-70px")};
    width: ${(props) => (props.expanded ? "400px" : "130px")};
    height: 130px;
    border-radius: ${(props) => (props.expanded ? "80px 0 0 80px" : "80px")};
    background: #ff3f3f;
  }
  @media (max-width: 425px) {
    width: ${(props) => (props.expanded ? "360px" : "130px")};
  }
`;

const DivBox = styled.div`
  width: 200px;
  height: 400px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 5%;
  transform: ${(props) =>
    props.show ? "translateY(15px)" : "translateY(-20px)"};
  transition: all 0.3s ease;
  position: absolute;
  font-size: 30px;
  top: 90%;

  @media (max-width: 768px) {
    display: none;
  }
`;
const Hamberger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "flex" : "none")};
    font-size: 40px;
    position: absolute;
    left: 15px;

    visibility: ${(props) => (props.show ? "visible" : "hidden")};
    opacity: ${(props) => (props.show ? 1 : 0)};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`;

const MobileDivBox = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  overflow: hidden;
  display: none;
  transition: all 0.3s ease;
  font-size: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    gap: 5%;
    border-radius: 30px 0 0 30px;
    background: #fff;
    box-shadow: 7px 7px 9px -5px gray;
    align-items: center;
    justify-content: end;
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: row;
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100px;
  color: #000;
  background: #ebebeb;
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100px;
    background: none;
    height: 100%;
    font-size: 18px;
    flex-direction: column;

    &:hover {
      color: #000;
      font-weight: bold;
    }
    @media (max-width: 425px) {
      font-size: 16px;
      width: 90px;
    }
  }
`;

const Icon = styled(CiCirclePlus)`
  font-size: 100px;
  transition: transform 0.5s ease; // 회전 애니메이션 추가
  transform: ${(props) =>
    props.expanded ? "rotate(135deg)" : "rotate(0deg)"}; // 상태에 따른 회전
  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "flex" : "none")};
    font-size: 40px;
    position: absolute;
    visibility: ${(props) => (props.show ? "visible" : "hidden")};
    opacity: ${(props) => (props.show ? 1 : 0)};
    width: 50px;
    height: 100%;
    background: #ff3f3f;
    left: 0;
    border-radius: 30px 0 0 30px;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // 상태로 제어
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogout = () => {
    alert("로그아웃 됐습니다");
    localStorage.clear();
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const toggleExpanded = () => {
    setExpanded(!expanded); // 클릭 시 expanded 상태를 토글
  };

  const modalChildren = () => (
    <BoardModalContent
      setTitle={() => {}}
      setContent={() => {}}
      buttonlist={[{ text: "저장", func: boardSave }]}
    />
  );

  const boardSave = async () => {
    try {
      const res = await BoardApi.boardSave("title", "content", "moun");
      console.log(res.data);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/admin")
  ) {
    return null;
  }

  return (
    <>
      <StyledHeader>
        <HeadBox>
          <Logo onClick={() => navigate("/")}>
            <img src={LogoImg} alt="로고" />
          </Logo>
          <MyBox expanded={expanded} onClick={toggleExpanded}>
            <Hamberger show={!expanded}>|||</Hamberger>
            <CloseButton show={expanded} onClick={() => setExpanded(false)}>
              <IoMdCloseCircleOutline />
            </CloseButton>
            <Icon expanded={expanded} />
            <DivBox show={expanded}>
              {Common.getAccessToken() ? (
                <>
                  <Div
                    onClick={() => navigate("/my")}
                    style={{
                      width: `120px`,
                      height: `150px`,
                      borderRadius: `100px`,
                      fontSize: `18px`,
                      flexDirection: `column`,
                      fontWeight: `bold`,
                      background: `none`,
                    }}
                  >
                    <FaUser style={{ fontSize: "40px" }} />
                    마이페이지
                  </Div>
                  <Div
                    onClick={openModal}
                    style={{
                      width: `120px`,
                      height: `150px`,
                      borderRadius: `100px`,
                      fontSize: `18px`,
                      flexDirection: `column`,
                      fontWeight: `bold`,
                      background: `none`,
                    }}
                  >
                    <IoChatbubbleEllipsesOutline style={{ fontSize: "40px" }} />
                    1:1 문의
                  </Div>
                  <Div
                    onClick={onClickLogout}
                    style={{
                      width: `120px`,
                      height: `150px`,
                      borderRadius: `100px`,
                      fontSize: `18px`,
                      flexDirection: `column`,
                      fontWeight: `bold`,
                      background: `none`,
                    }}
                  >
                    <RiLogoutBoxLine style={{ fontSize: "40px" }} />
                    로그아웃
                  </Div>
                </>
              ) : (
                <Div
                  onClick={() => navigate("/login")}
                  style={{
                    width: `120px`,
                    height: `150px`,
                    borderRadius: `100px`,
                    fontSize: `18px`,
                    flexDirection: `column`,
                    fontWeight: `bold`,
                    background: `none`,
                  }}
                >
                  로그인
                  <RiLoginBoxLine style={{ fontSize: "40px" }} />
                </Div>
              )}
            </DivBox>
            <MobileDivBox show={expanded}>
              {Common.getAccessToken() ? (
                <>
                  <Div onClick={() => navigate("/my")}>
                    <FaUser style={{ fontSize: "40px" }} />
                    마이페이지
                  </Div>
                  <Div onClick={openModal}>
                    <IoChatbubbleEllipsesOutline style={{ fontSize: "40px" }} />
                    1:1 문의
                  </Div>
                  <Div onClick={onClickLogout}>
                    <RiLogoutBoxLine style={{ fontSize: "40px" }} />
                    로그아웃
                  </Div>
                </>
              ) : (
                <Div onClick={() => navigate("/login")}>
                  <RiLoginBoxLine style={{ fontSize: "40px" }} />
                  로그인
                </Div>
              )}
            </MobileDivBox>
          </MyBox>
        </HeadBox>
      </StyledHeader>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={"1:1 문의"}
        children={modalChildren()}
      />
    </>
  );
};

export default Header;
