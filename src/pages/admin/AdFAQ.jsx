import styled from "styled-components";
import Button from "../../component/Button";
import Table from "../../component/Table";

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

const AdFAQ = () => {
  const userEx = [
    {
      name: "John Doe",
      email: "john@example.com",
      content: "문의 사항",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      content: "문의 사항",
    },
    {
      name: "Anna Doe",
      email: "john@example.com",
      content: "문의 사항",
    },
    {
      name: "Deric Smith",
      email: "jane@example.com",
      content: "문의 사항",
    },
    {
      name: "James Doe",
      email: "john@example.com",
      content: "문의 사항",
    },
  ];

  const list = (userEx) => {
    return userEx.map((user, index) => (
      <Tr key={index}>
        <Td>{user.name}</Td>
        <Td>{user.email}</Td>
        <Td>{user.content}</Td>
        <Td>
          <Button width={`80%`} backgroundColor={`#4aa1e7`}>
            답변
          </Button>
        </Td>
      </Tr>
    ));
  };
  return (
    <>
      <Container>
        <Box>
          <Table
            header={"FAQ"}
            list={list(userEx)}
            border={true}
            button={true}
          ></Table>
          <PagingDiv></PagingDiv>
        </Box>
      </Container>
    </>
  );
};

export default AdFAQ;
