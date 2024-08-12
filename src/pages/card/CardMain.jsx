import styled from "styled-components";
import CardPage from "./CardEx";
import SearchCard from "./SearchAllCard";
import CardTop from "./CardTop";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  gap: 30px;
`;

const Second = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SearchPage = styled.div`
  width: 100%;
  height: 300px;
`;

const CardMain = () => {
  return (
    <Container>
      <CardPage />
      <Second>
        <CardTop />
      </Second>
      <SearchPage>
        <SearchCard />
      </SearchPage>
    </Container>
  );
};

export default CardMain;
