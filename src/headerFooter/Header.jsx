import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  background: black;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  z-index: 9;
  gap: 5%;
  font-size: 30px;
  width: 100%;
  height: 14vh;
`;

const Div = styled.div`
  color: #fff;
  cursor: pointer;
  height: 100%;
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
    font-weight: bold;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <StyledHeader>
        <Div onClick={() => navigate("/")}>로고</Div>
        <Div onClick={() => navigate("/login")}>로그인</Div>
        <Div onClick={() => navigate("/suggestion")}>추천</Div>
      </StyledHeader>
    </>
  );
};

export default Header;
