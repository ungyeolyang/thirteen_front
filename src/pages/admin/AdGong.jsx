import styled from "styled-components";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { useEffect, useState } from "react";
import Modal from "../../component/Modal";
import BoardApi from "../../api/BoardAxiosApi";
import BoardModalContent from "./BoardModalContent";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #f3f3f3;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 6px 6px 0 #00000049;
`;

const Box = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 1rem;
`;

const Tr = styled.tr`
  width: 80%;
  &:nth-child(even) {
    background: #f9f9f9;
  }

  &:hover {
    background: #f1f1f1;
  }
`;

const PagingDiv = styled.div`
  width: 25%;
  height: 10%;
  background-color: #fff;
  margin-top: 10px;
`;

const AdGong = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bno, setBno] = useState();
  const [gongList, setGongList] = useState([]);
  const [modalView, setModalView] = useState("");
  // const [refresh, SetRefresh] = useState(false);

  useEffect(() => {
    const getGongJi = async () => {
      try {
        const res = await BoardApi.boardList("gong");
        setGongList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getGongJi();
  }, [modalOpen]);

  const gongSave = async () => {
    try {
      const res = await BoardApi.boardSave(title, content, "gong");
      closeModal();
    } catch (e) {}
  };

  const boardUpdate = async () => {
    try {
      const res = await BoardApi.boardUpdate(bno, title, content);
      closeModal();
    } catch (e) {}
  };

  const boardDelete = async () => {
    try {
      const res = await BoardApi.boardDelete(bno);
      closeModal();
    } catch (e) {}
  };

  const detailView = (userbno) => {
    const DetailData = async () => {
      try {
        const res = await BoardApi.getBoardDetail(userbno);
        setTitle(res.data.title);
        setContent(res.data.content);
        setBno(res.data.bno);
      } catch (e) {}
    };
    DetailData();
  };

  const list = () => {
    return (
      <>
        <Tr>
          <Td>No</Td>
          <Td>제목</Td>
          <Td>글쓴이</Td>
          <Td>작성시간</Td>
          <Td>조회수</Td>
          <Td></Td>
        </Tr>
        {gongList &&
          gongList.map((user, index) => (
            <Tr key={index}>
              <Td>{user.bno}</Td>
              <Td>{user.title}</Td>
              <Td>{user.member.nick}</Td>
              <Td>{user.bdate}</Td>
              <Td>{user.content}</Td>
              <Td>
                <Button
                  onClick={() => {
                    detailView(user.bno);
                    setModalView("detail");
                    openModal();
                  }}
                  backgroundColor={`#4aa1e7`}
                >
                  수정
                </Button>
              </Td>
            </Tr>
          ))}
      </>
    );
  };

  const modalChildren = () => {
    if (modalView === "save") {
      return (
        <>
          <BoardModalContent
            setTitle={setTitle}
            setContent={setContent}
            buttonlist={[{ text: "저장", func: gongSave }]}
          />
        </>
      );
    } else if (modalView === "detail") {
      return (
        <>
          <BoardModalContent
            setTitle={setTitle}
            title={title}
            content={content}
            setContent={setContent}
            value={true}
            read={true}
            buttonlist={[
              { text: "수정", func: () => setModalView("update") },
              { text: "삭제", func: () => setModalView("delete") },
            ]}
          />
        </>
      );
    } else if (modalView === "update") {
      return (
        <>
          <BoardModalContent
            setTitle={setTitle}
            title={title}
            content={content}
            setContent={setContent}
            buttonlist={[{ text: "수정", func: boardUpdate }]}
          />
        </>
      );
    } else if (modalView === "delete") {
      return (
        <>
          <BoardModalContent
            setTitle={setTitle}
            title={title}
            content={content}
            setContent={setContent}
            value={true}
            read={true}
            buttonlist={[{ text: "삭제", func: boardDelete }]}
          />
        </>
      );
    }
  };

  const openModal = () => {
    setModalOpen((prev) => !prev);
    return modalOpen;
  };

  const closeModal = () => {
    setBno("");
    setContent("");
    setTitle("");
    setModalView("");
    setModalOpen(false);
  };

  return (
    <>
      <Container>
        <Box>
          <Table
            header={"공지 사항"}
            color={`#fff`}
            list={list()}
            border={true}
            button={true}
            btnFun={() => {
              openModal();
              setModalView("save");
            }}
          ></Table>
          <PagingDiv></PagingDiv>
        </Box>
      </Container>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={"관리자"}
        children={modalChildren()}
      />
    </>
  );
};
export default AdGong;
