import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const FAQContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const FAQItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: auto;
`;

const Question = styled.div`
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Answer = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  min-height: 90px;
  text-align: center;
  padding: 10px 15px;
  box-sizing: border-box;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  line-height: 1.5;
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "웹사이트에서 제공하는 주요 서비스는 무엇인가요?",
      answer:
        "저희 웹사이트는 연말정산과 관련된 신용카드 사용 내역을 엑셀 파일로 업로드하여 카테고리별로 정리해 드립니다.<br>또한, 해당 카테고리에 맞는 신용카드를 추천하고, 환급받은 금액으로 구매할 만한 주식을 추천합니다. 주식 추천은 3일 후까지의 예측 정보를 바탕으로 제공됩니다.",
    },
    {
      question: "신용카드 사용 내역을 어떻게 업로드하나요?",
      answer:
        "신용카드 사용 내역 엑셀 파일을 웹사이트에 업로드하시면, 저희 시스템이 자동으로 카테고리별로 정리해 드립니다.<br>파일 업로드는 웹사이트의 '파일 업로드' 섹션에서 가능합니다.",
    },
    {
      question: "신용카드 추천은 어떻게 이루어지나요?",
      answer:
        "업로드된 신용카드 사용 내역을 분석하여 가장 유리한 카테고리별 신용카드를 추천합니다.<br>추천된 카드는 현재 제공되는 혜택과 적합성을 기준으로 선정됩니다.",
    },
    {
      question: "주식 추천은 어떻게 이루어지나요?",
      answer:
        "환급받은 금액을 바탕으로, 3일 후까지의 시장 예측 정보를 활용하여 적합한 주식을 추천해 드립니다.<br>추천된 주식은 투자 리스크를 최소화하고, 예측된 수익 가능성을 고려하여 선택됩니다.",
    },
    {
      question: "주식 추천 결과는 언제 확인할 수 있나요?",
      answer:
        "주식 추천 결과는 주식 시장 예측 데이터를 바탕으로 매일 업데이트됩니다.<br>일반적으로 엑셀 파일 업로드 후 24시간 이내에 추천 주식 목록을 확인하실 수 있습니다.",
    },
    {
      question: "웹사이트 이용 중 문제가 발생하면 어떻게 해야 하나요?",
      answer:
        "웹사이트 이용 중 문제가 발생한 경우, '고객 지원' 페이지에서 문의하실 수 있습니다.<br>이메일, 전화번호 또는 실시간 채팅을 통해 고객 지원 팀에 연락하시면 신속하게 도움을 드리겠습니다.",
    },
    {
      question: "개인정보는 안전하게 보호되나요?",
      answer:
        "네, 저희 웹사이트는 사용자 개인정보 보호를 최우선으로 하며, 업로드된 데이터는 암호화되어 안전하게 처리됩니다.<br>개인정보 보호 정책에 대한 자세한 내용은 '개인정보 보호 정책' 페이지에서 확인하실 수 있습니다.",
    },
  ];

  return (
    <FAQContainer>
      {faqData.map((item, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleFAQ(index)}>{item.question}</Question>
          <Answer
            isOpen={openIndex === index}
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
