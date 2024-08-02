import { useState } from "react";
import LoginAxiosApi from "../../api/AuthAxiosApi";
import styled from "styled-components";
import { GoPerson, GoMail } from "react-icons/go";
import Common from "../../utils/Common";
import InputBox from "../../component/InputBox";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
const Error = styled.div`
  color: #ff3f3f;
  font-size: 20px;
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const FindIdPw = ({
  category,
  inputEmail,
  setInputEmail,
  setIsId,
  setIsEmail,
  onClickFind,
  setInputId,
  message,
}) => {
  const onBlurId = (e) => {
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!idRegex.test(e.target.value)) {
      setIsId(false);
    } else {
      existId(e.target.value);
    }
  };

  const existId = async (id) => {
    try {
      const rsp = await LoginAxiosApi.existInfo(id, 1);
      console.log("아이디" + rsp.data);
      if (rsp.data) {
        setIsId(true);
      } else {
        setIsId(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onBlureMail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(inputEmail)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  return (
    <>
      <Container>
        <InputBox>
          <GoMail style={{ color: `gray` }} />
          <input
            type="text"
            placeholder="이메일"
            onChange={(e) => setInputEmail(e.target.value)}
            value={inputEmail}
            onBlur={onBlureMail}
            onKeyDown={(e) => Common.onKeyDownEnter(e, onClickFind)}
          />
        </InputBox>
        {category === `pw` && (
          <InputBox>
            <GoPerson style={{ color: `gray` }} />
            <input
              type="text"
              placeholder="아이디"
              onChange={(e) => setInputId(e.target.value)}
              onBlur={onBlurId}
              maxLength={20}
              onKeyDown={(e) => Common.onKeyDownEnter(e, onClickFind)}
            />
          </InputBox>
        )}
        <Error>{message}</Error>
      </Container>
    </>
  );
};
export default FindIdPw;
