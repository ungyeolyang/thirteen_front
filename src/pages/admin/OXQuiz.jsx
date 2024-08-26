import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 80%;
  margin: 10px;
  font-size: 24px;
  border: ${(props) => (props.selected ? "2px solid #007bff" : "none")};
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#fff" : "#bdbdbd")};
  color: ${(props) => (props.selected ? "#000" : "#fff")};

  @media (max-width: 1024px) {
    height: 200px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const Btn = styled.div`
  width: 80%;
  height: 120px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
  }
`;

const GoBtn = styled.div`
  width: 200px;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff3f3f;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  min-height: 40px;

  &:hover {
    background: #da3f3f;
  }
  @media (max-width: 1024px) {
    height: 70px;
  }
`;

const NextBtn = styled.div`
  border-radius: 15px;
  width: 200px;
  height: 70%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    gap: 5px;
  }
`;

const Feedback = styled.div`
  width: 100%;
  font-size: 16px; /* 기본 폰트 크기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  overflow-y: auto;
  padding: 15px 10px;
  text-align: center;
`;

const OXQuiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correctAnswerIndex = quizData[currentQuestionIndex].answer;
    const isAnswerCorrect = selectedOption === correctAnswerIndex;

    setIsCorrect(isAnswerCorrect);

    const feedbackMessage = isAnswerCorrect
      ? `<span style="color: green; font-size: 20px; font-weight: bold;">정답 : </span>${quizData[currentQuestionIndex].explanation}`
      : `<span style="color: red; font-size: 20px; font-weight: bold;">오답 : </span>${quizData[currentQuestionIndex].explanation}`;

    setFeedback(feedbackMessage);
    setIsSubmit(true);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsSubmit(false);
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % quizData.length);
  };

  const question = quizData[currentQuestionIndex];

  return (
    <Container>
      <h2>연말정산 상식퀴즈</h2>
      <h3>{question.question}</h3>
      <BtnContainer>
        <Button
          selected={selectedOption === 0}
          onClick={() => handleOptionChange(0)}
        >
          O
        </Button>
        <Button
          selected={selectedOption === 1}
          onClick={() => handleOptionChange(1)}
        >
          X
        </Button>
      </BtnContainer>
      {feedback && <Feedback dangerouslySetInnerHTML={{ __html: feedback }} />}
      <Btn>
        {isSubmit ? (
          <NextBtn onClick={handleNextQuestion}>
            다음 문제
            <IoIosArrowForward />
          </NextBtn>
        ) : (
          <GoBtn onClick={handleSubmit}>제출</GoBtn>
        )}
      </Btn>
    </Container>
  );
};

export default OXQuiz;
