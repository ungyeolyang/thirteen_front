import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SuggestionP = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  text-align: center;
  font-size: 25px;
  color: #fff;
  background: #c14e4e;
`;

const SuggestionCard = styled.div`
  width: 100%;
  flex-wrap: wrap;
  height: auto;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: 255px;
  height: 400px;
  perspective: 1000px;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: rotateY(180deg) translateY(-30px);
  }
`;

const Front = styled.div`
  cursor: pointer;
  width: ${({ isPortrait }) => (isPortrait ? "209px" : "331px")};
  height: ${({ isPortrait }) => (isPortrait ? "331px" : "209px")};
  background-image: url(${({ url }) => url && url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ rotate }) => (rotate ? "rotate(90deg)" : "none")};
`;

const CardBack = styled.div`
  width: 209px;
  height: 331px;
  position: absolute;
  background: #ccc;
  border-radius: 15px;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const LineB = styled.div`
  width: 20%;
  height: 100%;
  background: #000;
`;

const CardText = styled.div`
  width: 65%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const ModalBtn = styled.div`
  width: 100%;
  height: 50px;
  color: #000;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 20px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid #00bfff;
  }
`;

const CardTop = ({ data, loading, category, setSelectedCard }) => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    const getTop = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/topcard?categories=${category}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const processedCards = await Promise.all(
          res.data.map(async (card) => {
            const img = new Image();
            img.src = card.cimage;
            await img.decode();

            const isPortrait = img.height > img.width; // 세로로 배치된 경우
            const rotate = !isPortrait; // 가로로 배치된 경우

            return {
              ...card,
              isPortrait,
              rotate,
            };
          })
        );

        setTop(processedCards);
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    if (data && !loading) {
      getTop();
    }
  }, [category, data, loading]);

  return (
    <Container>
      <Second>
        <SuggestionP>
          <p>고객의 소비패턴에 따른 카드 추천 Top 5</p>
        </SuggestionP>
        <SuggestionCard>
          {top &&
            top.map((card) => (
              <CardWrapper id={card.id} key={card.id}>
                <Card>
                  <Front
                    url={card.cimage}
                    isPortrait={card.isPortrait}
                    rotate={card.rotate}
                  ></Front>
                  <CardBack>
                    <LineB></LineB>
                    <CardText>
                      <h2>{card.ccname}</h2>
                      <ModalBtn onClick={() => setSelectedCard(card)}>
                        <p>자세히 보기</p>
                      </ModalBtn>
                    </CardText>
                  </CardBack>
                </Card>
              </CardWrapper>
            ))}
        </SuggestionCard>
      </Second>
    </Container>
  );
};

export default CardTop;
