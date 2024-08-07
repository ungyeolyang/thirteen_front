import styled from "styled-components";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { useEffect, useState } from "react";
import Modal from "../../component/Modal";
import BoardApi from "../../api/BoardAxiosApi";

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
`;

const SaveDiv = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  background-color: #acaaaa;
`;

const TitleDiv = styled.div`
  width: 90%;
  height: 8%;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInside = styled.div`
  width: 42%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.div`
  width: 38%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;
const TitleInput = styled.input`
  width: 62%;
  background-color: #acaaaa;
  border: 0cap;
  font-size: 1rem;
  box-sizing: border-box;
  color: #000;
  /* font-weight: bold; */
  /* text-align: center; */
  position: relative;
  &:focus {
    /* border-color: #333; */
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const ContentInput = styled.input`
  width: 100%;
  height: 74%;
  text-align: center;
  background-color: #acaaaa;
  border: 0cap;
  font-size: 1rem;
  box-sizing: border-box;
  color: #000;
  &:focus {
    /* border-color: #333; */
    outline: none;
  }
`;

const AdGong = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gongList, setGongList] = useState([]);

  useEffect(() => {
    const getGongJi = async () => {
      try {
        const res = await BoardApi.boardList("gong");
        console.log(res.data);

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
      console.log(res.data);
      closeModal();
    } catch (e) {}
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
                <Button backgroundColor={`#4aa1e7`}>버튼</Button>
              </Td>
            </Tr>
          ))}
      </>
    );
  };

  const gongSaveView = () => {
    return (
      <>
        <SaveDiv>
          <TitleDiv>
            <TitleInside>
              <TitleP>제목 : </TitleP>
              <TitleInput
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                // placeholder="제목 입력"
              />
            </TitleInside>
            <TitleInside>
              <TitleP>글쓴이 : </TitleP>
              <TitleInput
                type="text"
                value={"닉네임"}
                // placeholder="제목 입력"
              />
            </TitleInside>
          </TitleDiv>
          <ContentInput
            type="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용 입력"
          />
          <Button onClick={gongSave}>제출</Button>
        </SaveDiv>
      </>
    );
  };

  const openModal = () => {
    setModalOpen((prev) => !prev);
    return modalOpen;
  };
  const closeModal = () => setModalOpen(false);

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
            btnFun={openModal}
          ></Table>
          <PagingDiv></PagingDiv>
        </Box>
      </Container>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={"공지사항 작성"}
        children={gongSaveView()}
      />
    </>
  );
};
export default AdGong;
