import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCoins } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import MyInfo from "./MyInfo";
import MyAxiosApi from "../../api/MyAxiosApi";
import Refund from "./Refund";
import EditPw from "./EditPw";
import EditEamil from "./EditEmail";
import Modal from "../../component/Modal";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 80vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 20px;

  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

// 왼쪽 메뉴박스
const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 60px;
  width: 20%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 1024px) {
    width: 80%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 메뉴 아이템
const Menu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  color: ${({ active }) => (active ? "#7189FF" : "#333")};
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: #7189ff;
    background-color: #f0f4f8;
  }

  @media (max-width: 1024px) {
    width: 50%;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// 오른쪽 박스
const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: auto;
  padding: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

// 정보박스
const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 회원탈퇴 경고박스
const DelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 100%;
  height: 150px;
  border-radius: 15px;
  font-size: 20px;
  text-align: center;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const btnRef = useRef(null);
  const [category, setCategory] = useState("정보수정");
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [header, setHeader] = useState();
  const [type, setType] = useState();
  const [refresh, setRefresh] = useState(false);
  const [yes, setYes] = useState();

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
            setYes={setYes}
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
            setYes={setYes}
            btnRef={btnRef}
          />
        );
      case 4:
        return (
          <EditEamil
            closeModal={closeModal}
            member={user}
            input={input}
            setInput={setInput}
            onModify={onModify}
            btnRef={btnRef}
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
          <Menu
            onClick={() => setCategory("정보수정")}
            active={category === "정보수정"}
          >
            <IoPersonCircleOutline style={{ fontSize: `60px` }} />
            정보수정
          </Menu>
          {/* <Menu
            onClick={() => setCategory("환급액 확인")}
            active={category === "환급액 확인"}
          >
            <FaCoins style={{ fontSize: `45px` }} />
            환급액 확인
          </Menu> */}
          <Menu
            onClick={() => {
              setDelModalOpen(true);
            }}
          >
            <MdLogout style={{ fontSize: `60px` }} />
            회원탈퇴
          </Menu>
        </MenuBox>
        <RightBox>
          <InfoBox>{info()}</InfoBox>
        </RightBox>
        <Modal
          open={modalOpen}
          close={closeModal}
          header={header}
          type={true}
          yes={yes}
          confirm={() => btnRef.current.click()}
        >
          {onEdit(type)}
        </Modal>
        <Modal
          open={delModalOpen}
          close={closeDelModal}
          header={"회원탈퇴"}
          type={true}
          confirm={onClickDel}
        >
          <DelBox>정말 탈퇴하시겠습니까?</DelBox>
        </Modal>
      </Container>
    </>
  );
};

export default MyPage;
