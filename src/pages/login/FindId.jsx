import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin-top: 10px;
  border: 3px solid #000;
  height: 100px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const Box = styled.div`
  span {
    font-weight: bold;
    font-size: 20px;
  }
`;

const FindId = ({ id }) => {
  return (
    <>
      <Container>
        <p>이메일 정보와 일치하는 아이디입니다.</p>
        <Box>
          <span>아이디 : </span> {id}
        </Box>
      </Container>
    </>
  );
};
export default FindId;
