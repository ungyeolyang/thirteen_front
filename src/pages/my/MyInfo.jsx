import { useEffect, useRef, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";
import styled from "styled-components";
import Button from "../../component/Button";
import InputBox from "../../component/InputBox";
import { storage } from "../../api/Firebase";
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const ProfileBox = styled.div`
  width: 300px;
  height: 300px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    box-shadow: 1px 1px 1px 1px gray;

    @media (max-width: 1024px) {
      font-size: 16px;
    }
  }
  @media (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;
const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MyInfo = ({
  user,
  setModalOpen,
  setHeader,
  setType,
  onModify,
  message,
  setMessage,
  setRefresh,
}) => {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [inputNick, setInputNick] = useState("");

  const onClickInputFile = () => {
    inputFile.current.click();
  };
  const onChangFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      console.error("파일이 선택 안됨");
    }
  };

  const Div = styled.div`
    width: 100%;
    height: 100px;

    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    p {
      position: absolute;
      left: 15px;
      top: 0;
    }

    @media (max-width: 768px) {
      height: 90px;
    }
  `;
  const Box = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: start;
    align-items: center;
    position: relative;
  `;

  const NickB = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Btn = styled.button`
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    background: #fff;
    border: 1px solid silver;
    cursor: pointer;

    &:hover {
      background: #bbbbbb;
      color: #fff;
    }
    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      padding: 10px 15px;
    }
  `;

  const Error = styled.div`
    display: flex;
    align-items: center;
    color: #ff3f3f;
    font-size: 18px;
    min-height: 26px;
    visibility: ${({ children }) => (children === "" ? `hidden` : `visible`)};
    position: absolute;
    bottom: -60%;

    @media (max-width: 768px) {
      font-size: 16px;
      bottom: -55%;
    }
  `;

  const onClickEdit = (type) => {
    setModalOpen(true);
    setType(type);
    switch (type) {
      case 1:
        setHeader("프로필 수정");
        break;
      case 2:
        setHeader("비밀번호 수정");
        break;
      case 3:
        setHeader("닉네임 수정");
        break;
      case 4:
        setHeader("이메일 수정");
        break;
      default:
        setHeader("오류");
        break;
    }
  };

  const onClickProfile = async () => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file?.name);
      try {
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        console.log("저장경로 확인 : " + url);
        onModify(url, 1);
        setRefresh((prev) => !prev);
        alert("프로필 수정이 완료");
      } catch (e) {
        console.log(e, "파이어베이스 오류");
      }
    }
  };

  const onClickNick = async () => {
    const nickRegex = /^[a-zA-Z0-9가-힣]{2,16}$/;
    if (!inputNick) {
      setMessage("");
    } else if (!nickRegex.test(inputNick)) {
      setMessage("닉네임: 2~16자의 숫자,영문자, 한글을 사용해주세요.");
    } else {
      setMessage("");
      try {
        onModify(inputNick, 3);
        setRefresh((prev) => !prev);
        alert("닉네임 수정이 완료");
      } catch (e) {
        console.log(e, "닉네임 수정 오류");
      }
    }
  };

  return (
    <>
      <Container>
        <Cdiv>
          <ProfileBox>
            <Profile
              src={previewUrl || user?.image}
              size={`70%`}
              onClick={user?.social === "COMMON" ? onClickInputFile : undefined}
            >
              <input
                type="file"
                onChange={onChangFile}
                ref={inputFile}
                hidden
              />
            </Profile>
            {user?.social === "COMMON" && (
              <Btn onClick={onClickProfile}>프로필 변경</Btn>
            )}
          </ProfileBox>
        </Cdiv>
        <Cdiv>
          {user?.social === "COMMON" && (
            <Div>
              <p>이메일</p>
              <Box>
                <InputBox background={`white`} width={`80%`}>
                  <input type="text" placeholder={user?.email} disabled />
                </InputBox>
                <Btn onClick={() => onClickEdit(4)}>수정</Btn>
              </Box>
            </Div>
          )}
          <Div>
            <p>닉네임</p>
            <Box>
              <InputBox background={`white`} width={`80%`}>
                <input
                  type="text"
                  placeholder={user?.nick}
                  onChange={(e) => setInputNick(e.target.value)}
                  disabled={user?.social === "COMMON" ? false : true}
                />
              </InputBox>
              <Error>{message}</Error>

              {user?.social === "COMMON" && (
                <Btn onClick={onClickNick}>수정</Btn>
              )}
            </Box>
          </Div>
          <Div>
            <p>아이디</p>
            <Box>
              <InputBox background={`white`} width={`80%`}>
                <input type="text" placeholder={user?.mid} disabled />
              </InputBox>
            </Box>
          </Div>
          {user?.social === "COMMON" && (
            <Div>
              <p>비밀번호</p>
              <Box>
                <InputBox background={`white`} width={`80%`}>
                  <input type="text" placeholder={`비밀번호`} disabled />
                </InputBox>
                <Btn onClick={() => onClickEdit(2)}>수정</Btn>
              </Box>
            </Div>
          )}
        </Cdiv>
      </Container>
    </>
  );
};
export default MyInfo;
