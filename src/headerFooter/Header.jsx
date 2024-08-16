import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCircleUser } from "react-icons/fa6";
import LogoImg from "../image/LogoGreen-removebg-preview.png";

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
  height: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  cursor: pointer;
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const MyBox = styled.div`
  color: #858585;
  position: fixed;
  right: 1%;
  cursor: pointer;
  width: 200px;
  border-radius: 30px;
  height: 100px;
  font-size: 80px;
  background: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    color: #000;
    font-weight: bold;
  }

  &:hover > div {
    visibility: visible;
    opacity: 1;
    transform: translateY(15px);
  }
`;

const DivBox = styled.div`
  width: 100%;
  height: 300px;
  visibility: hidden;
  opacity: 0;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5%;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  position: absolute;
  font-size: 30px;
  top: 50%;
`;

const Div = styled.div`
  width: 100%;
  height: 100px;
  background: #ccc;
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogout = () => {
    alert("로그아웃 됐습니다");
    localStorage.clear();
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
          <MyBox>
            <FaCircleUser onClick={() => navigate("/my")} />
            <DivBox>
              <Div onClick={() => navigate("/login")}>로그인</Div>
              <Div onClick={onClickLogout}>로그아웃</Div>
            </DivBox>
          </MyBox>
        </HeadBox>
      </StyledHeader>
    </>
  );
};

export default Header;
