import { useNavigate } from "react-router-dom";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import Common from "../../utils/Common";
import styled from "styled-components";
import Kakao from "../../image/kakao-talk.png";

const Circle = styled.div`
  display: flex;
  width: 10%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: invert(1);
  }
  @media screen and (max-width: 425px) {
    width: 18%;
  }
`;
const KaKaoBox = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  background: #fddc3f;
  font-size: 25px;
  cursor: pointer;

  @media screen and (max-width: 425px) {
    border-bottom: none;
  }
  &:hover {
    background: #dac24a;
  }

  div {
    font-weight: bold;
    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
  }
`;

const KakaoLogin = () => {
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.Kakao?.Auth.login({
      success: function (obj) {
        console.log(obj);
        getInfo(obj.access_token);
      },
    });
  };

  const getInfo = async (token) => {
    try {
      const res = await AuthAxiosApi.kakao(token);
      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KaKaoBox onClick={kakaoLogin}>
      <Circle>
        <img src={Kakao} alt="" />
      </Circle>
      <div>카카오 로그인</div>
    </KaKaoBox>
  );
};
export default KakaoLogin;
