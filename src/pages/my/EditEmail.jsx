import { useEffect, useState } from "react";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { GoLock, GoMail } from "react-icons/go";
import emailjs from "@emailjs/browser";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Binbox = styled.div`
  width: 25px;
  height: 30px;
`;

const Error = styled.div`
  color: #ff3f3f;
  width: 100%;
  font-size: 19px;
  justify-content: center;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const EditEamil = ({
  input,
  setInput,
  member,
  closeModal,
  onModify,
  btnRef,
}) => {
  const [isClickCert, setIsClickCert] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isCert, setIsCert] = useState(false);
  const [inputCert, setInputCert] = useState("");
  const [checkCert, setCheckCert] = useState("");
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    // if (checkEmail !== e.target.value) {
    //   setIsClickCert(false);
    // }
    setInput(e.target.value);
  };

  const onClickEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!input || !emailRegex.test(input)) {
      setMessage("이메일 주소가 정확한지 확인해 주세요.");
      setIsEmail(false);
    } else if (member?.email === input) {
      closeModal();
    } else {
      setMessage("");
      existEmail(input);
    }
  };

  const existEmail = async (email) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(email, 2);
      console.log(`이메일:` + rsp.data);
      if (rsp.data) {
        setMessage("사용할 수 없는 이메일입니다. 다른 이메일을 입력해주세요");
        setIsEmail(false);
      } else {
        setMessage("");
        onCert(email);
        setIsEmail(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCert = async (email) => {
    const certification = Math.floor(Math.random() * 900000) + 100000;
    setCheckCert(certification);
    const templateParams = {
      email: email,
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
    } catch (e) {
      console.log(e);
    }
  };

  const onClickModify = async () => {
    console.log(checkCert);
    if (!isEmail) {
    } else if (checkCert != inputCert) {
      setMessage("인증번호가 일치하지 않습니다.");
    } else {
      onModify(input, 4);
    }
  };

  return (
    <Container>
      <InputBox style={{ width: `100%`, height: `50px`, marginBottom: `10px` }}>
        <GoMail style={{ color: `gray` }} />
        <input
          type="text"
          placeholder="새 이메일"
          onChange={(e) => onChangeEmail(e)}
          onKeyDown={(e) =>
            Common.onKeyDownEnter(e, isClickCert ? onClickModify : onClickEmail)
          }
          disabled={isClickCert}
          style={{
            border: message && "3px solid red",
            height: `100%`,
          }}
        />
        <button
          onClick={
            isClickCert
              ? () => {
                  setIsClickCert(false);
                }
              : onClickEmail
          }
        >
          {isClickCert ? `수정` : `인증`}
        </button>
      </InputBox>
      {isClickCert && (
        <>
          <InputBox style={{ marginBottom: `10px`, width: `100%` }}>
            <GoLock style={{ color: `gray` }} />
            <input
              type="text"
              placeholder="인증번호"
              onChange={(e) => setInputCert(e.target.value)}
              maxLength={20}
            />
          </InputBox>
        </>
      )}
      <Error>{message}</Error>

      <button onClick={onClickModify} ref={btnRef} hidden>
        수정
      </button>
    </Container>
  );
};
export default EditEamil;
