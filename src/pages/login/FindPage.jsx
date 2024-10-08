import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import FindIdPw from "./FindIdPw";
import FindPw from "./FindPw";
import FindId from "./FindId";

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 65%;
`;
const Span = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 20px 0;
  font-size: 24px;
  width: 100%;
  font-weight: bold;
  color: ${({ active }) => (active ? `#c80000` : `gray`)};
  border-bottom: 3px solid ${({ active }) => (active ? `#c80000` : "gray")};
`;

const FindBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50px;
  gap: 10px;
`;
const OkButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 40px;
  background: #c80000;
  font-size: 25px;
  border-radius: 15px;
  color: #fff;
  border: none;
  &:hover {
    background-color: rgb(193, 78, 78);
  }
`;
const NoButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.5);
  font-size: 25px;
  color: #fff;
  border: none;
  &:hover {
    background-color: #8c98a3;
  }
`;
const FindPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category);
  const [inputEmail, setInputEmail] = useState("");
  const [inputId, setInputId] = useState("");
  const [message, setMessage] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const [id, setId] = useState("");

  const [isFindId, setIsFindId] = useState(false);
  const [isFindPw, setIsFindPw] = useState(false);

  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const onClickFind = () => {
    if (category === "id") {
      if (inputEmail === "") {
        setMessage("이메일을 입력하세요");
      } else if (isEmail) {
        find();
      } else {
        setMessage("정확한 이메일을 입력해주세요.");
      }
    } else {
      if (inputEmail === "") {
        setMessage("이메일을 입력하세요");
      } else if (inputId === "") {
        setMessage("아이디 입력하세요");
      } else if (isEmail && isId) {
        find();
      } else {
        setMessage("이메일또는 아이디를 잘못 입력했습니다.");
      }
    }
  };

  const find = async () => {
    if (isFindId) {
      navigate("/login");
    }
    try {
      const res = await AuthAxiosApi.findInfo(inputEmail);
      // console.log(res.data);
      if (res.data) {
        if (category === "id") {
          setId(res.data);
          setIsFindId(true);
        } else if (category === "pw") {
          setIsFindPw(true);
          setMessage("");
        }
      } else {
        console.log("아이디찾기 오류");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onClickReset = () => {
    if (!isPw) {
      setMessage("5~20자의 숫자,영문자를 사용해주세요.");
    } else if (!(inputPw === checkPw)) {
      setMessage("비밀번호가 일치하지 않습니다");
    } else {
      setMessage("");
      reset();
    }
  };

  const reset = async () => {
    try {
      const res = await AuthAxiosApi.resetPw(inputId, checkPw);
      if (res.data) {
        // console.log(res.data);
        navigate("/login");
      } else {
        console.log("비밀번호 수정 오류");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setIsFindId(false);
    setIsFindPw(false);
    setInputEmail("");
    setMessage("");
  }, [category]);

  return (
    <>
      <Div>
        <Span active={category === `id`} onClick={() => setCategory("id")}>
          아이디 찾기
        </Span>
        <Span active={category === `pw`} onClick={() => setCategory("pw")}>
          비밀번호 찾기
        </Span>
      </Div>
      {!(isFindId || isFindPw) && (
        <FindIdPw
          category={category}
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
          setIsId={setIsId}
          setIsEmail={setIsEmail}
          onClickFind={onClickFind}
          setInputId={setInputId}
          message={message}
        />
      )}
      {isFindId && <FindId id={id} />}
      {isFindPw && (
        <FindPw
          setIsPw={setIsPw}
          inputPw={inputPw}
          setInputPw={setInputPw}
          checkPw={checkPw}
          setCheckPw={setCheckPw}
          message={message}
          setMessage={setMessage}
        />
      )}
      <FindBtn>
        <NoButton
          onClick={() => navigate("/login", { state: { fromLogin: true } })}
        >
          취소
        </NoButton>
        <OkButton onClick={isFindPw ? onClickReset : onClickFind}>
          확인
        </OkButton>
      </FindBtn>
    </>
  );
};
export default FindPage;
