import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1b2046;
  color: #fff;
  width: 100%;
  height: 20vh;
  text-align: center;
  font-size: 25px;
`;
const Footer = () => {
  const location = useLocation();
  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/admin")
  ) {
    return null;
  }

  return (
    <StyledFooter>
      <span>이용약관</span>
      <span>개인정보 취급방침</span>
      <p>(주) 일공이오</p>
      <p>양웅열 | 이혜원 | 서용욱 | 이하림 | 안준영</p>
      <p>주소:서울특별시 강남구 역삼로</p>
      <p>전화번호 02-123-4567</p>
      <p>이메일 : annaidle99@gmail.com</p>
      <p>CopyRight © 2024 Cinepic All Rights Reserved.</p>
    </StyledFooter>
  );
};
export default Footer;
