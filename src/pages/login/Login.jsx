import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoLock } from "react-icons/go";
import Common from "../../utils/Common";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import KakaoLogin from "./KakaoLogin";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import MyAxiosApi from "../../api/MyAxiosApi";

const Line = styled.div`
  display: flex;
  color: gray;
  gap: 3px;
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  color: #ff3f3f;
  font-size: 24px;
  min-height: 26px;
  visibility: ${({ children }) => (children === "" ? `hidden` : `visible`)};
`;

const SignupBox = styled.div`
  cursor: pointer;
  color: ${({ color }) => color && color};
  &:hover {
    color: ${({ hover }) => (hover ? hover : `#002A70`)};
  }
`;

const HeaderBox = styled.div`
  width: 70%;
  font-weight: bold;
  font-size: 26px;
  margin: 100px 0;
`;
const Hdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  span {
    font-weight: bolder;
    font-size: 32px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (Common.getRefreshToken()) {
  //     navigate("/");
  //   }
  // }, []);

  const onClickLogin = () => {
    if (inputId === "") {
      setMessage("아이디를 입력해 주세요.");
    } else if (inputPw === "") {
      setMessage("비밀번호를 입력해 주세요.");
    } else login();
  };

  const login = async () => {
    try {
      const res = await AuthAxiosApi.login(inputId, inputPw);
      console.log(res.data);

      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        authority();
        navigate("/");
      } else {
        setMessage("아이디또는 비밀번호를 잘못 입력했습니다.");
        setInputPw("");
      }
    } catch (err) {
      console.log(err);
      setMessage("아이디또는 비밀번호를 잘못 입력했습니다.");
      setInputPw("");
    }
  };

  const authority = async () => {
    try {
      const res = await MyAxiosApi.authority();
      console.log(res.data);
      if (res.data.includes("USER")) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <HeaderBox>
        <Hdiv>Welcome to</Hdiv>
        <Hdiv>
          <span>양웅열과 아이들</span>
        </Hdiv>
      </HeaderBox>
      <InputBox>
        <GoPerson style={{ color: `gray` }} />
        <input
          type="text"
          placeholder="아이디"
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => Common.onKeyDownEnter(e, onClickLogin)}
        />
      </InputBox>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type="password"
          placeholder="비밀번호"
          value={inputPw}
          onChange={(e) => setInputPw(e.target.value)}
          onKeyDown={(e) => Common.onKeyDownEnter(e, onClickLogin)}
        />
      </InputBox>
      <Error>{message}</Error>
      <Button onClick={onClickLogin}>
        <div>로그인 </div>
      </Button>
      <Button>
        <KakaoLogin />
      </Button>
      <Line>
        <span>계정이 없으신가요?</span>
        <SignupBox
          onClick={() => {
            navigate("signup", { state: { fromLogin: false } });
          }}
          color="RGB(113, 153, 255)"
          hover="#002A8E"
        >
          회원가입
        </SignupBox>
      </Line>
      <Line>
        <SignupBox
          onClick={() => {
            navigate("find", { state: { fromLogin: false, category: "id" } });
          }}
        >
          아이디 찾기
        </SignupBox>
        <span>ㅣ</span>
        <SignupBox
          onClick={() => {
            navigate("find", { state: { fromLogin: false, category: "pw" } });
          }}
        >
          비밀번호 찾기
        </SignupBox>
      </Line>
    </>
  );
};

export default Login;
