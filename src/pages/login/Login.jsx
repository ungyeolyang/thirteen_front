import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoLock } from "react-icons/go";
import Common from "../../utils/Common";
import AuthAxiosApi from "../../api/AuthAxiosApi";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 50px;
  padding: 0 20px;
  border: 1px solid black;
  border-radius: 10px;

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 90%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    padding-top: 10px;
  }
  input::placeholder {
    font-size: 24px;
  }
  svg {
    font-size: 24px;
  }
`;

const Line = styled.div`
  display: flex;
  color: gray;
  gap: 3px;
  padding-top: 10px;
  font-size: 24px;
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
  &:hover {
    color: #bf00ff;
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
      // console.log(res.data);
      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        navigate("/");
      } else {
        setMessage("아이디또는 비밀번호를 잘못 입력했습니다.");
        setInputPw("");
        console.log("오류");
      }
    } catch (err) {
      console.log(err);
      setMessage("아이디또는 비밀번호를 잘못 입력했습니다.");
      setInputPw("");
    }
  };

  return (
    <>
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
      <button onClick={onClickLogin}>
        <div>로그인 </div>
      </button>
      <Line>
        <SignupBox
          onClick={() => {
            navigate("find/id");
          }}
        >
          아이디 찾기
        </SignupBox>
        <span>ㅣ</span>
        <SignupBox
          onClick={() => {
            navigate("find/pw");
          }}
        >
          비밀번호 찾기
        </SignupBox>
        <span>ㅣ</span>
        <SignupBox
          onClick={() => {
            navigate("signup");
          }}
        >
          회원가입
        </SignupBox>
      </Line>
      {/* <KakaoBox>
        <KakaoLogin radius={`10px`} />
      </KakaoBox> */}
    </>
  );
};

export default Login;
