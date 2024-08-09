import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCoins } from "react-icons/fa6";
import { useEffect, useState } from "react";
import MyInfo from "./MyInfo";
import MyAxiosApi from "../../api/MyAxiosApi";
import Refund from "./Refund";
import EditPw from "./EditPw";
import EditEamil from "./EditEmail";
import Modal from "../../component/Modal";
import { useNavigate } from "react-router-dom";

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
`;
const InfoBox = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 5%;
  background-color: silver;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("정보수정");
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [header, setHeader] = useState();
  const [type, setType] = useState();
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const info = () => {
    switch (category) {
      case `정보수정`:
        return (
          <MyInfo
            user={user}
            setModalOpen={setModalOpen}
            setHeader={setHeader}
            setType={setType}
            onModify={onModify}
            category={category}
            setMessage={setMessage}
            message={message}
            setRefresh={setRefresh}
          />
        );
      case "환급액 확인":
        return <Refund user={user} onModify={onModify} />;
      default:
        return;
    }
  };

  useEffect(() => {
    info();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setRefresh((prev) => !prev);
    setMessage("");
    setInput("");
  };
  const closeDelModal = () => {
    setDelModalOpen(false);
    setRefresh((prev) => !prev);
  };

  const onModify = async (info, inputType) => {
    try {
      const res = await MyAxiosApi.editInfo(info, inputType);
      if (res.data) {
        // console.log("수정성공");
        closeModal();
      } else {
        console.log("수정실패");
      }
    } catch (e) {
      console.log(e, "수정 오류");
    }
  };

  const onEdit = (type) => {
    switch (type) {
      case 2:
        return (
          <EditPw
            input={input}
            setInput={setInput}
            message={message}
            setMessage={setMessage}
            onModify={onModify}
          />
        );
      case 4:
        return (
          <EditEamil
            closeModal={closeModal}
            member={user}
            input={input}
            setInput={setInput}
            message={message}
            setMessage={setMessage}
            onModify={onModify}
          />
        );
      default:
    }
  };
  const onClickDel = async () => {
    try {
      const res = await MyAxiosApi.withdraw();
      if (res.data) {
        alert("회원탈퇴가 완료되었습니다.");
        localStorage.clear();
        navigate("/");
      }
    } catch (e) {}
  };

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
          <div
            onClick={() => {
              setDelModalOpen(true);
            }}
          >
            회원탈퇴
          </div>
        </MenuBox>
        <RightBox>
          <InfoBox>{info()}</InfoBox>
        </RightBox>
        <Modal open={modalOpen} close={closeModal} header={header}>
          {onEdit(type)}
        </Modal>
        <Modal
          open={delModalOpen}
          close={closeDelModal}
          header={"회원탈퇴"}
          type={true}
          confirm={onClickDel}
        >
          정말로 탈퇴하시겠습니까?
        </Modal>
      </Container>
    </>
  );
};
export default MyPage;
