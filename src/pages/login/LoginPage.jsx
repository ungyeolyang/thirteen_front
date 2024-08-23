import styled, { css, keyframes } from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../image/LogoGreen-removebg-previewN.png";
import Modal from "../../component/Modal";
import { useEffect } from "react";
import Common from "../../utils/Common";

const left = keyframes`
  0% {
    transform: translateX(0) 
  }
  100% {
    transform: translateX(-40%) 
  }
`;
const right = keyframes`
  0% {
    transform: translateX(-60%)
  }
  100% {
    transform: translateX(0)
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Pentagon = styled.div`
  position: absolute;
  left: -10%;
  width: 100vw;
  height: 200vh;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-image: url("https://static.toss.im/assets/homepage/newtossim/new_main.png");
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  ${({ animationType }) => {
    switch (animationType) {
      case "left":
        return css`
          animation: ${left} 1s ease forwards;
        `;
      case "right":
        return css`
          animation: ${right} 0.7s ease-out forwards;
        `;
      default:
        return "";
    }
  }}
`;
const LogoBox = styled.div`
  position: absolute;
  cursor: pointer;
  top: 50px;
  width: 70%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
`;
const Odiv = styled.div`
  position: relative;
  width: 45%;
  height: 100%;
  display: flex;
  gap: 15px;
  padding: 0 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Pdiv = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const animationType =
    location.state?.fromLogin === true
      ? "right"
      : location.state?.fromLogin === false
      ? "left"
      : "";

  const flexDirection = location.pathname === "/login" ? "row" : "row-reverse";

  useEffect(() => {
    Common.getAccessToken() && navigate("/");
  }, []);

  return (
    <>
      {!Common.getAccessToken() && (
        <Container flexDirection={flexDirection}>
          <Odiv>
            <LogoBox onClick={() => navigate("/")}>
              <img src={Logo} alt="로고" />
            </LogoBox>
            <Outlet />
          </Odiv>
          <Pdiv>
            <Pentagon animationType={animationType} />
          </Pdiv>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
