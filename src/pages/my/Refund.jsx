import styled from "styled-components";
import Button from "../../component/Button";
import InputBox from "../../component/InputBox";
import { GiMeal } from "react-icons/gi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;
const Lbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 30%;
`;
const Rbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 50%;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: white;
  width: 100%;
  height: 80%;
`;
const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: silver;
  border-radius: 40px;
  width: 80%;
  height: 10%;
`;

const Refund = ({ user }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <Container>
        <Lbox>
          <p>이번년도 연봉</p>
          <InputBox background={`white`} width={`100%`}>
            <input
              type="text"
              placeholder={user.pay ? user.pay : `연봉을 입력해주세요`}
            />
          </InputBox>
          <Button width={`20%`} height={"30px"}>
            수정
          </Button>
        </Lbox>
        <Rbox>
          <p>회원님의 예상 환급액은 {}입니다.</p>
          <Box>
            <Line>{`${year}년도 소비카테고리`}</Line>
            <p>{`회원님은 ${year}년도 00에 가장 많은 돈을 사용하였습니다.`}</p>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
          </Box>
        </Rbox>
      </Container>
    </>
  );
};
export default Refund;
