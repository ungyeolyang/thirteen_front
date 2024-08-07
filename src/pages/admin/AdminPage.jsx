import styled from "styled-components";
import AdMember from "./AdMember";
import AdCate from "./AdCate";
import { useEffect, useState } from "react";
import AdFAQ from "./AdFAQ";
import AdMoun from "./AdMoun";
import AdGong from "./AdGong";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 95%;
  height: 95%;
  background-color: #e9e8e8;
  border-radius: 10px;
  display: flex; /* flex container 설정 */
  flex-direction: row; /* flex-direction을 row로 설정 */
`;
const Category = styled.div`
  width: 15%;
  height: 100%;
`;
const Main = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminPage = () => {
  const [mainview, setMainView] = useState("member");

  useEffect(() => {}, [mainview]);

  const mainChange = () => {
    if (mainview === "member") {
      return <AdMember />;
    } else if (mainview === "faq") {
      return <AdFAQ />;
    } else if (mainview === "moun") {
      return <AdMoun />;
    } else if (mainview === "gong") {
      return <AdGong />;
    }
  };
  return (
    <>
      <Container>
        <Box>
          <Category>
            <AdCate setMainView={setMainView} mainview={mainview} />
          </Category>
          <Main>{mainChange()}</Main>
        </Box>
      </Container>
    </>
  );
};
export default AdminPage;
