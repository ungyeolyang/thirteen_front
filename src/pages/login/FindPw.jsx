import styled from "styled-components";
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import InputBox from "../../component/InputBox";

const Error = styled.div`
  color: #ff3f3f;
  margin-top: 10px;
  width: 100%;
  font-size: 20px;
  justify-content: center;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const FindPw = ({ setIsPw, setInputPw, setCheckPw, message }) => {
  const [isEye, setIsEye] = useState(false);

  const onBlurPw = (e) => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!pwRegex.test(e.target.value)) {
      setIsPw(false);
    } else {
      setIsPw(true);
    }
  };

  return (
    <>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type={isEye ? `text` : `password`}
          placeholder="새 비밀번호"
          onChange={(e) => setInputPw(e.target.value)}
          onBlur={(e) => onBlurPw(e)}
          maxLength={20}
        />
        {isEye ? (
          <GoEye
            onClick={() => {
              setIsEye(false);
            }}
            style={{ color: `gray` }}
          />
        ) : (
          <GoEyeClosed
            onClick={() => {
              setIsEye(true);
            }}
            style={{ color: `gray` }}
          />
        )}
      </InputBox>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type={isEye ? `text` : `password`}
          placeholder="새 비밀번호 확인"
          onChange={(e) => setCheckPw(e.target.value)}
          maxLength={20}
        />
        {isEye ? (
          <GoEye
            onClick={() => {
              setIsEye(false);
            }}
            style={{ color: `gray` }}
          />
        ) : (
          <GoEyeClosed
            onClick={() => {
              setIsEye(true);
            }}
            style={{ color: `gray` }}
          />
        )}
      </InputBox>
      <Error>{message}</Error>
    </>
  );
};
export default FindPw;
