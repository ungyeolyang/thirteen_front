import styled from "styled-components";
import CardImg from "../../image/HD_10393_20240704-174740_ver.png";

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

const SuggestionP = styled.div`
  width: 100%;
  height: 100px;
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

  &:hover {
    transform: rotateY(180deg) translateY(-30px);
  }
`;

const Front = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;

  background-image: url(${CardImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 13px;
  background: #c14e4e;
  color: #ccc;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: rotateY(180deg);
`;
const LineB = styled.div`
  width: 15%;
  height: 100%;
  background: #000000;
`;

const Text = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const SearchPage = styled.div`
  width: 100%;
  height: 300px;
`;

const CardTop = () => {
  return (
    <Container>
      <Second>
        <SuggestionP>
          <p>고객의 소비패턴에 따른 카드 추천 Top 5</p>
        </SuggestionP>

        <SuggestionCard>
          <CardWrapper>
            <Card>
              <Front></Front>
              <Back>
                <LineB></LineB>

                <Text>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </Text>
              </Back>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card>
              <Front></Front>
              <Back>
                <LineB></LineB>

                <Text>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </Text>
              </Back>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card>
              <Front></Front>
              <Back>
                <LineB></LineB>

                <Text>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </Text>
              </Back>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card>
              <Front></Front>
              <Back>
                <LineB></LineB>

                <Text>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </Text>
              </Back>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card>
              <Front></Front>
              <Back>
                <LineB></LineB>

                <Text>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </Text>
              </Back>
            </Card>
          </CardWrapper>
        </SuggestionCard>
      </Second>
    </Container>
  );
};

export default CardTop;
