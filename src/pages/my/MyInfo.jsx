import { useEffect, useRef, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";
import styled from "styled-components";
import Button from "../../component/Button";
import InputBox from "../../component/InputBox";
import { storage } from "../../api/Firebase";
const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;
const ProfileBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  button {
    position: absolute;
    padding: 5px;
    border-radius: 10px;
    border: none;
    box-shadow: 1px 1px 1px 1px gray;
    bottom: 0;
    right: 0;
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

  const Error = styled.div`
    display: flex;
    align-items: center;
    color: #ff3f3f;
    font-size: 24px;
    min-height: 26px;
    visibility: ${({ children }) => (children === "" ? `hidden` : `visible`)};
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
              size={`100%`}
              onClick={onClickInputFile}
            >
              <input
                type="file"
                onChange={onChangFile}
                ref={inputFile}
                hidden
              />
            </Profile>
            {user?.social === "COMMON" && (
              <button onClick={onClickProfile}>수정</button>
            )}
          </ProfileBox>
        </Cdiv>
        <Cdiv>
          {user?.social === "COMMON" && (
            <div>
              <p>이메일</p>
              <InputBox background={`white`} width={`100%`}>
                <input type="text" placeholder={user?.email} disabled />
              </InputBox>
              <button onClick={() => onClickEdit(4)}>수정</button>
            </div>
          )}
          <div>
            <p>닉네임</p>
            <InputBox background={`white`} width={`100%`}>
              <input
                type="text"
                placeholder={user?.nick}
                onChange={(e) => setInputNick(e.target.value)}
              />
            </InputBox>
            <Error>{message}</Error>
            {user?.social === "COMMON" && (
              <button onClick={onClickNick}>수정</button>
            )}
          </div>
          <div>
            <p>아이디</p>
            <InputBox background={`white`} width={`100%`}>
              <input type="text" placeholder={user?.mid} disabled />
            </InputBox>
          </div>
          {user?.social === "COMMON" && (
            <div>
              <p>비밀번호</p>
              <InputBox background={`white`} width={`100%`}>
                <input type="text" placeholder={`비밀번호`} disabled />
              </InputBox>
              <button onClick={() => onClickEdit(2)}>수정</button>
            </div>
          )}
        </Cdiv>
      </Container>
    </>
  );
};
export default MyInfo;
