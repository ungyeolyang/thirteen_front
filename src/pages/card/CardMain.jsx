import styled from "styled-components";
import CardPage from "./CardEx";

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
  height: auto;
`;
const SuggestionP = styled.div`
  width: 100%;
  margin-top: 15px;
  font-size: 25px;
  text-align: center;
`;
const SuggestionCard = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  div {
    width: 300px;
    height: 350px;
    background: #ccc;
  }
`;

const CardMain = () => {
  return (
    <Container>
      <CardPage />
      <Second>
        <SuggestionP>
          <p>고객의 소비패턴에 따른 카드 추천</p>
        </SuggestionP>
        <SuggestionCard>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </SuggestionCard>
      </Second>
    </Container>
  );
};
export default CardMain;
