import styled from "styled-components";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { useEffect, useState } from "react";
import BoardApi from "../../api/BoardAxiosApi";
import BoardComment from "./BoardComment";
import Modal from "../../component/Modal";

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

const AdMoun = () => {
  const [mlist, setMList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cno, setCno] = useState();
  const [board, setBoard] = useState();
  const [tf, setTF] = useState(false);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(0);
  const [pageCnt, setPageCnt] = useState([]);

  useEffect(() => {
    const getGongJi = async () => {
      try {
        const res = await BoardApi.boardList("moun", page);

        setMList(res.data.board);
        setPageCnt(res.data.page);
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

  const tfCheck = (userTF) => {
    if (userTF === "TRUE") {
      setTF(true);
    } else {
      setTF(false);
    }
  };

  const detailView = async (userbno) => {
    try {
      const res = await BoardApi.commetDetail(userbno);
      const res1 = await BoardApi.getBoardDetail(userbno);
      setBoard(res1.data);
      setComment(res.data.comment);
      setCno(res.data.cno);
    } catch (e) {}
  };

  const boardSave = async () => {
    try {
      const res = await BoardApi.commentSave(comment, board.bno);
      closeModal();
    } catch (e) {}
  };

  const boardUpdate = async () => {
    try {
      const res = await BoardApi.cUpdate(comment, board.bno, cno);
      closeModal();
    } catch (e) {}
  };

  const boardDelete = async () => {
    try {
      const res = await BoardApi.boardDelete(board.bno);
      closeModal();
    } catch (e) {}
  };

  const list = () => {
    return (
      mlist &&
      mlist.map((user, index) => (
        <Tr key={index}>
          <Td>{user.bno}</Td>
          <Td>{user.title}</Td>
          <Td>{user.member.nick}</Td>
          <Td>{user.bdate}</Td>
          <Td>{user.content}</Td>
          <Td>{user.tf}</Td>
          <Td>
            <Button
              onClick={() => {
                detailView(user.bno);
                // setModalView("detail");
                tfCheck(user.tf);
                openModal();
              }}
              backgroundColor={`#4aa1e7`}
            >
              상세보기
            </Button>
          </Td>
        </Tr>
      ))
    );
  };

  const modalChildren = () => {
    if (!tf) {
      return (
        <BoardComment
          board={board}
          comment={comment}
          setComment={setComment}
          buttonlist={[{ text: "답변", func: boardSave }]}
        ></BoardComment>
      );
    } else {
      return (
        <BoardComment
          board={board}
          comment={comment}
          setComment={setComment}
          buttonlist={[
            { text: "수정", func: boardUpdate },
            { text: "삭제", func: boardDelete },
          ]}
        />
      );
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Table header={"문의 사항"} list={list()} border={true}></Table>
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
        header={"문의사항"}
        children={modalChildren()}
      />
    </>
  );
};
export default AdMoun;
