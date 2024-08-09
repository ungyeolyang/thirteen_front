import styled from "styled-components";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { useEffect, useState } from "react";
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
`;

const ChartBox = styled.div`
  width: 100%;
  height: 40%;
  border-radius: 10px 10px 0 0;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
  gap: 2%;
`;

const Graph = styled.div`
  width: 65%;
  height: 85%;
  background-color: #fff;
  gap: 2%;
`;

const Donut = styled.div`
  width: 20%;
  height: 85%;
  background-color: #fff;
`;

const BoardBox = styled.div`
  width: 100%;
  height: 58%;
  border-radius: 0 0 10px 10px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 20px; */
  /* overflow-y: auto; 스크롤이 생기도록 설정 */
`;

const Head = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5%;
  align-items: center;
  justify-content: center;
`;

const Td = styled.td`
  /* padding: 10px; */
  border-bottom: 1px solid #ddd;
  text-align: center;
  align-items: center;
  justify-content: center;
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

const AdMember = () => {
  const [member, setMember] = useState([]);

  useEffect(() => {
    const getAlluser = async () => {
      try {
        const res = await BoardApi.alluser();
        if (res.data) {
          setMember(res.data);
        }
      } catch (e) {}
    };
    getAlluser();
  }, []);

  const list = (list) => {
    return (
      list &&
      list.map((user, index) => (
        <Tr key={index}>
          <Td>{user.nick}</Td>
          <Td>{user.email}</Td>
          <Td>{user.mid}</Td>
          <Td>{user.social}</Td>
          <Td>{user.image}</Td>
          <Td>
            <Button backgroundColor={`#4aa1e7`} width={`60%`} height={`60%`}>
              버튼
            </Button>
          </Td>
        </Tr>
      ))
    );
  };

  const head = () => {
    return (
      <Head>
        <p>이름</p>
        <p>이메일</p>
        <p>생성날자</p>
        <p>탈퇴여부</p>
        <p>카카오</p>
        <p></p>
      </Head>
    );
  };

  return (
    <Container>
      <Box>
        <ChartBox>
          <Graph></Graph>
          <Donut></Donut>
        </ChartBox>
        <BoardBox>
          <Table
            color={`lightgray`}
            width={`100%`}
            header={head()}
            list={list(member)}
          />
          <PagingDiv></PagingDiv>
        </BoardBox>
      </Box>
    </Container>
  );
};

export default AdMember;
