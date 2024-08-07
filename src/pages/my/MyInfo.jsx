import { useEffect, useRef, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";
import styled from "styled-components";
import Button from "../../component/Button";
import InputBox from "../../component/InputBox";

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
const MyInfo = ({ user }) => {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
            <button>수정</button>
          </ProfileBox>
        </Cdiv>
        <Cdiv>
          <div>
            <p>이메일</p>
            <InputBox background={`white`} width={`100%`}>
              <input type="text" placeholder={user?.email} disabled />
            </InputBox>
            <button>수정</button>
          </div>
          <div>
            <p>닉네임</p>
            <InputBox background={`white`} width={`100%`}>
              <input type="text" placeholder={user?.nick} disabled />
            </InputBox>
            <button>수정</button>
          </div>
          <div>
            <p>아이디</p>
            <InputBox background={`white`} width={`100%`}>
              <input type="text" placeholder={user?.mid} disabled />
            </InputBox>
          </div>
          <div>
            <p>비밀번호</p>
            <InputBox background={`white`} width={`100%`}>
              <input type="text" placeholder={`비밀번호`} disabled />
            </InputBox>
            <button>수정</button>
          </div>
        </Cdiv>
      </Container>
    </>
  );
};
export default MyInfo;
