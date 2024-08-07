import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Box = styled.div`
  width: 100%;
  height: 30%;
  /* border: 1px solid #b42121; */
  display: flex; /* flex container 설정 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3%;
`;

const Button = styled.div`
  width: 80%;
  height: 15%;
  font-size: 1.5rem;
  background-color: ${({ active }) => (active ? `#aa2d2d` : `#fff`)};
  color: ${({ active }) => (active ? `#fff` : `#000`)};
  align-items: center;
  justify-content: center;
  &:hover {
    background: #aa2d2d;
  }
`;

const AdCate = ({ setMainView, mainview }) => {
  return (
    <>
      <Container>
        <Box></Box>
        <Box>
          <Button
            active={mainview === "member"}
            onClick={() => setMainView("member")}
          >
            회원관리
          </Button>
          <Button
            active={mainview === "faq"}
            onClick={() => setMainView("faq")}
          >
            FAQ
          </Button>
          <Button
            active={mainview === "moun"}
            onClick={() => setMainView("moun")}
          >
            문의사항
          </Button>
          <Button
            active={mainview === "gong"}
            onClick={() => setMainView("gong")}
          >
            공지사항
          </Button>
        </Box>
        <Box></Box>
      </Container>
    </>
  );
};
export default AdCate;
