import { useState } from "react";
import Common from "../../utils/Common";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { GoPerson, GoLock, GoMail, GoEye, GoEyeClosed } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import InputBox from "../../component/InputBox";

const SignBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const Error = styled.div`
  color: #ff3f3f;
  font-size: 20px;
  justify-content: flex-start;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;
const ErrorBox = styled.div``;

const Signup = () => {
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [inputCert, setInputCert] = useState(0);
  const [checkCert, setCheckCert] = useState(0);

  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [nickMessage, setNickMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [certMessage, setCertMessage] = useState("");

  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isNick, setIsNick] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isCert, setIsCert] = useState(false);

  const [isClickCert, setIsClickCert] = useState(false);
  const [isEye, setIsEye] = useState(false);

  const onBlurId = () => {
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!inputId) {
      setIdMessage("아이디: 필수 정보입니다.");
      setIsId(false);
    } else if (!idRegex.test(inputId)) {
      setIdMessage("아이디: 5~20자의 숫자,영문자만 사용 가능합니다.");
      setIsId(false);
    } else {
      setIdMessage("");
      existId(inputId);
    }
  };

  const existId = async (id) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(id, 1);
      // console.log(`아이디:` + rsp.data);
      if (rsp.data) {
        setIdMessage("사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요");
        setIsId(false);
      } else {
        setIdMessage("");
        setIsId(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onBlurPw = () => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!inputPw) {
      setPwMessage("비밀번호: 필수 정보입니다.");
      setIsPw(false);
    } else if (!pwRegex.test(inputPw)) {
      setPwMessage("비밀번호: 5~20자의 숫자,영문자를 사용해주세요.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const onBlurNick = () => {
    const nickRegex = /^[a-zA-Z0-9가-힣]{2,16}$/;
    if (!inputNick) {
      setNickMessage("닉네임: 필수 정보입니다.");
      setIsNick(false);
    } else if (!nickRegex.test(inputNick)) {
      setNickMessage("닉네임: 2~16자의 숫자,영문자, 한글을 사용해주세요.");
      setIsNick(false);
    } else {
      setNickMessage("");
      setIsNick(true);
    }
  };

  // const existNick = async (nick) => {
  //   try {
  //     const rsp = await AuthAxiosApi.existInfo(nick, 3);
  //     console.log(`닉네임:` + rsp.data);
  //     if (rsp.data) {
  //       setNickMessage(
  //         "사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요"
  //       );
  //       setIsNick(false);
  //     } else {
  //       setNickMessage("");
  //       setIsNick(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onBlureMail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!inputEmail) {
      setEmailMessage("이메일: 필수 정보입니다.");
      setIsEmail(false);
    } else if (!emailRegex.test(inputEmail)) {
      setEmailMessage("이메일 주소가 정확한지 확인해 주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      existEmail(inputEmail);
    }
  };

  const existEmail = async (email) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(email, 2);
      // console.log(`이메일:` + rsp.data);
      if (rsp.data) {
        setEmailMessage(
          "사용할 수 없는 이메일입니다. 다른 이메일을 입력해주세요"
        );
        setIsEmail(false);
      } else {
        setEmailMessage("");
        setIsEmail(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCert = async () => {
    if (!isEmail) {
      alert("정확한 이메일을 입력해주세요.");
    } else {
      const certification = Math.floor(Math.random() * 900000) + 100000;
      console.log(certification); //인증번호
      setCheckCert(certification);
      const templateParams = {
        email: inputEmail,
        certification: certification,
      };
      try {
        await emailjs.send(
          "service_kr7pxmb",
          "template_2girkj8",
          templateParams,
          "WQbPpTPtl4ML1Reqd"
        );
        setIsClickCert(true);
        setCheckEmail(inputEmail);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const login = async () => {
    try {
      const res = await AuthAxiosApi.login(inputId, inputPw);
      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        navigate("/");
      } else {
        console.log("오류");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onBlurCert = () => {
    if (parseInt(inputCert) === checkCert) {
      setIsCert(true);
      setCertMessage("");
    } else {
      setCertMessage("인증번호를 정확하게 다시 입력해 주세요.");
      setIsCert(false);
    }
  };

  const onClickJoin = async () => {
    if (isId && isPw && isNick && isEmail && isCert) {
      try {
        const rsp = await AuthAxiosApi.signup(
          inputEmail,
          inputId,
          inputPw,
          inputNick
        );
        if (rsp.data) {
          login();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <SignBox>
        <InputBox>
          <GoPerson style={{ color: `gray` }} />
          <input
            type="text"
            placeholder="아이디"
            onChange={(e) => setInputId(e.target.value)}
            onBlur={onBlurId}
            maxLength={20}
            onKeyDown={(e) => Common.onKeyDownEnter(e, onClickJoin)}
            style={{ border: idMessage && "3px solid red" }}
          />
        </InputBox>
        <InputBox>
          <GoLock style={{ color: `gray` }} />
          <input
            type={isEye ? `text` : `password`}
            placeholder="비밀번호"
            onChange={(e) => setInputPw(e.target.value)}
            onBlur={onBlurPw}
            maxLength={20}
            onKeyDown={(e) => Common.onKeyDownEnter(e, onClickJoin)}
            style={{ border: pwMessage && "3px solid red" }}
          />
          {isEye ? (
            <GoEye
              onClick={() => {
                setIsEye(false);
              }}
              style={{ color: `gray`, cursor: "pointer" }}
            />
          ) : (
            <GoEyeClosed
              onClick={() => {
                setIsEye(true);
              }}
              style={{ color: `gray`, cursor: "pointer" }}
            />
          )}
        </InputBox>
        <InputBox>
          <GoPerson style={{ color: `gray` }} />
          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setInputNick(e.target.value)}
            onBlur={onBlurNick}
            onKeyDown={(e) => Common.onKeyDownEnter(e, onClickJoin)}
            style={{ border: nickMessage && "3px solid red" }}
          />
        </InputBox>
        <InputBox>
          <GoMail style={{ color: `gray` }} />
          <input
            type="text"
            placeholder="이메일"
            onChange={(e) => onChangeEmail(e)}
            onBlur={onBlureMail}
            onKeyDown={(e) =>
              Common.onKeyDownEnter(e, isClickCert ? onClickJoin : onClickCert)
            }
            disabled={isClickCert}
            style={{ border: emailMessage && "3px solid red" }}
          />
          <button
            onClick={
              isClickCert
                ? () => {
                    setIsClickCert(false);
                  }
                : onClickCert
            }
          >
            {isClickCert ? `수정` : `인증`}
          </button>
        </InputBox>
        <ErrorBox>
          <Error>{idMessage}</Error>
          <Error>{pwMessage}</Error>
          <Error>{nickMessage}</Error>
          <Error>{emailMessage}</Error>
        </ErrorBox>
        {isClickCert && (
          <>
            <InputBox>
              <GoLock style={{ color: `gray` }} />
              <input
                type="text"
                placeholder="인증번호"
                onChange={(e) => setInputCert(e.target.value)}
                onBlur={onBlurCert}
                maxLength={20}
              />
            </InputBox>
            <Error>{certMessage}</Error>
          </>
        )}
        <ButtonContainer>
          <button
            onClick={() => navigate("/login", { state: { fromLogin: true } })}
          >
            취소
          </button>
          <button onClick={onClickJoin}>가입하기</button>
        </ButtonContainer>
      </SignBox>
    </>
  );
};

export default Signup;
