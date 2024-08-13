import styled from "styled-components";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { useEffect, useState } from "react";
import BoardApi from "../../api/BoardAxiosApi";
import Modal from "../../component/Modal";
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
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 1rem;
`;

const Tr = styled.tr`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2%;
`;

const PageBtn = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4aa1e7;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const AdFAQ = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bno, setBno] = useState();
  const [faqList, setFaqList] = useState([]);
  const [modalView, setModalView] = useState("");
  const [page, setPage] = useState(0);
  const [pageCnt, setPageCnt] = useState([]);

  useEffect(() => {
    const getGongJi = async () => {
      try {
        const res = await BoardApi.boardList("faq", page);
        setPageCnt(res.data.page);
        setFaqList(res.data.board);
      } catch (e) {
        console.log(e);
      }
    };
    getGongJi();
  }, [modalOpen, page]);

  const openModal = () => {
    setModalOpen((prev) => !prev);
    return modalOpen;
  };

  const closeModal = () => setModalOpen(false);

  const faqSave = async () => {
    try {
      const res = await BoardApi.boardSave(title, content, "faq");
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
        {faqList &&
          faqList.map((user, index) => (
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
            buttonlist={[{ text: "저장", func: faqSave }]}
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

  return (
    <>
      <Container>
        <Box>
          <Table
            header={"공지 사항"}
            list={list()}
            border={true}
            button={true}
            btnFun={() => {
              openModal();
              setModalView("save");
            }}
          ></Table>
          <PagingDiv>
            {Array.from({ length: pageCnt }, (_, index) => (
              <PageBtn onClick={() => setPage(index)} key={index}>
                {index + 1}
              </PageBtn>
            ))}
          </PagingDiv>
        </Box>
      </Container>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={"자주 묻는 질문 작성"}
        children={modalChildren()}
      />
    </>
  );
};

export default AdFAQ;
