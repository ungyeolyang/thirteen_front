import { useEffect, useRef, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";
import styled from "styled-components";
import Button from "../../component/Button";

const ProfileBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
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
      <p>{user.email}</p>
      <p>{user.nick}</p>
      <p>{user.mid}</p>
      <ProfileBox>
        <Profile
          src={previewUrl || user.image}
          size={`100%`}
          onClick={onClickInputFile}
        >
          <input type="file" onChange={onChangFile} ref={inputFile} hidden />
        </Profile>
        <button>수정</button>
      </ProfileBox>
    </>
  );
};
export default MyInfo;
