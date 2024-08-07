import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCoins } from "react-icons/fa6";
import { useEffect, useState } from "react";
import MyInfo from "./MyInfo";
import MyAxiosApi from "../../api/MyAxiosApi";
import Refund from "./Refund";

const Container = styled.div`
  display: flex;
`;
const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  gap: 50px;
  width: 30%;
  height: 100vh;
  background: red;

  div {
    display: flex;
    width: 80%;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    &:hover {
      color: RGB(113, 153, 255);
    }
  }
`;
const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100vh;
  background: blue;
`;
const InfoBox = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 5%;
  background-color: silver;
`;

const MyPage = () => {
  const [category, setCategory] = useState("정보수정");
  const [user, setUser] = useState();

  useEffect(() => {
    const myInfo = async () => {
      try {
        const res = await MyAxiosApi.detail();
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("유저정보를 못불러옴");
        }
      } catch (e) {
        console.log(e);
      }
    };
    myInfo();
  }, []);

  const info = () => {
    switch (category) {
      case `정보수정`:
        return <MyInfo user={user} />;
      case "환급액 확인":
        return <Refund user={user} />;
      default:
        return;
    }
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <>
      <Container>
        <MenuBox>
          <div onClick={() => setCategory("정보수정")}>
            <IoPersonCircleOutline style={{ fontSize: `60px` }} />
            정보수정
          </div>
          <div onClick={() => setCategory("환급액 확인")}>
            <FaCoins style={{ fontSize: `45px` }} />
            환급액 확인
          </div>
          <div>회원탈퇴</div>
        </MenuBox>
        <RightBox>
          <InfoBox>{info()}</InfoBox>
        </RightBox>
      </Container>
    </>
  );
};
export default MyPage;
