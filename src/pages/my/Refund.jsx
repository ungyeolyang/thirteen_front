import styled from "styled-components";
import Button from "../../component/Button";
import InputBox from "../../component/InputBox";
import { GiMeal } from "react-icons/gi";
import { useEffect, useState } from "react";

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

const Refund = ({ user, onModify }) => {
  const year = new Date().getFullYear();
  const [inputPay, setInputPay] = useState(null);
  const [paidTax, setPaidTax] = useState(0);
  const [refund, setRefund] = useState(null);

  const calculateRefund = () => {
    // 1. 근로소득공제 계산
    let workIncomeDeduction;
    if (user.pay <= 5000) {
      workIncomeDeduction = user.pay * 0.7;
    } else if (user.pay <= 12000) {
      workIncomeDeduction = 3500 + (user.pay - 5000) * 0.4;
    } else {
      workIncomeDeduction = 9500 + (user.pay - 12000) * 0.05;
    }

    // 2. 근로소득 계산
    const workIncome = user.pay - workIncomeDeduction;

    // 3. 과세표준 계산 (소득공제 1,500만원 가정)
    const incomeDeduction = 1500;
    const taxableIncome = Math.max(workIncome - incomeDeduction, 0);

    // 4. 소득세 계산
    let incomeTax;
    if (taxableIncome <= 1200) {
      incomeTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 4600) {
      incomeTax = 1200 * 0.06 + (taxableIncome - 1200) * 0.15;
    } else if (taxableIncome <= 8800) {
      incomeTax =
        1200 * 0.06 + (4600 - 1200) * 0.15 + (taxableIncome - 4600) * 0.24;
    } else if (taxableIncome <= 15000) {
      incomeTax =
        1200 * 0.06 +
        (4600 - 1200) * 0.15 +
        (8800 - 4600) * 0.24 +
        (taxableIncome - 8800) * 0.35;
    } else if (taxableIncome <= 30000) {
      incomeTax =
        1200 * 0.06 +
        (4600 - 1200) * 0.15 +
        (8800 - 4600) * 0.24 +
        (15000 - 8800) * 0.35 +
        (taxableIncome - 15000) * 0.38;
    } else if (taxableIncome <= 50000) {
      incomeTax =
        1200 * 0.06 +
        (4600 - 1200) * 0.15 +
        (8800 - 4600) * 0.24 +
        (15000 - 8800) * 0.35 +
        (30000 - 15000) * 0.38 +
        (taxableIncome - 30000) * 0.4;
    } else {
      incomeTax =
        1200 * 0.06 +
        (4600 - 1200) * 0.15 +
        (8800 - 4600) * 0.24 +
        (15000 - 8800) * 0.35 +
        (30000 - 15000) * 0.38 +
        (50000 - 30000) * 0.4 +
        (taxableIncome - 50000) * 0.42;
    }

    // 5. 세액공제 계산 (최대 74만원)
    const taxCredit = Math.min(incomeTax * 0.55, 74);

    // 6. 결정세액
    const finalTax = incomeTax - taxCredit;

    // 7. 환급액 계산
    const refundAmount = paidTax - finalTax;

    setRefund(refundAmount);
  };

  useEffect(() => {
    calculateRefund();
  }, [user.pay, paidTax]);

  return (
    <>
      <Container>
        <Lbox>
          <p>이번년도 연봉</p>
          <InputBox background={`white`} width={`100%`}>
            <input
              type="text"
              placeholder={user.pay ? user.pay : `연봉을 입력해주세요`}
              value={inputPay}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setInputPay(value);
                }
              }}
            />
          </InputBox>
          <Button
            width={`20%`}
            height={"30px"}
            onClick={() => {
              onModify(inputPay, 5);
            }}
          >
            수정
          </Button>
          <p>납부한 소득세</p>
          <InputBox background={`white`} width={`100%`}>
            <input
              type="text"
              placeholder={user.pay ? user.pay : `납부한 소득세를 입력해주세요`}
              value={paidTax}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPaidTax(value);
                }
              }}
            />
          </InputBox>
        </Lbox>
        <Rbox>
          <p>회원님의 예상 환급액은 {Math.floor(refund)}원 입니다.</p>
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
