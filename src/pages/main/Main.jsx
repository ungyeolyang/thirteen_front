import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Modal from "../../component/Modal";
import BoardModalContent from "../admin/BoardModalContent";
import BoardApi from "../../api/BoardAxiosApi";
import { useNavigate } from "react-router-dom";

// 페이드 인 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WebText = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const fadeInAnimation = css`
  animation: ${fadeIn} 0.8s forwards;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  box-sizing: border-box;
`;

const SuggestionBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
`;

const Box = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
`;

const ChirdBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const HalfHeightSection = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  margin: 20px 0;
`;

const SubSection1Box = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.bgColor || "#fff"};
  color: ${(props) => props.color || "#000"};
  font-size: 22px;
  font-weight: bold;
  transition: transform 0.3s;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  ${(props) => props.isVisible && fadeInAnimation};

  &:hover {
    transform: translateY(-5px);
  }
`;
const CardText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  line-height: 2;
`;
const StockText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  line-height: 2;
`;
const SubSection1 = styled.div`
  width: 70%;
  height: 80%;
  border: red 2px solid;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) rotate(-1deg);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.8);
  }
`;

const SubSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TableSection = styled.div`
  width: 70%;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: center;
  margin-top: 20px;

  & table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  & th,
  & td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
  }

  & th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

const Main = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isFirstBoxVisible, setIsFirstBoxVisible] = useState(false);
  const [isSecondBoxVisible, setIsSecondBoxVisible] = useState(false);

  const navigate = useNavigate();

  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.8, // 요소의 50%가 보일 때
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === firstBoxRef.current) {
          if (entry.isIntersecting && !isFirstBoxVisible) {
            setIsFirstBoxVisible(true);
          }
        }
        if (entry.target === secondBoxRef.current) {
          if (entry.isIntersecting && !isSecondBoxVisible) {
            setIsSecondBoxVisible(true);
          }
        }
      });
    }, options);

    if (firstBoxRef.current) {
      observer.observe(firstBoxRef.current);
    }
    if (secondBoxRef.current) {
      observer.observe(secondBoxRef.current);
    }

    return () => {
      if (firstBoxRef.current) {
        observer.unobserve(firstBoxRef.current);
      }
      if (secondBoxRef.current) {
        observer.unobserve(secondBoxRef.current);
      }
    };
  }, [isFirstBoxVisible, isSecondBoxVisible]);

  const modalChildren = () => (
    <>
      <BoardModalContent
        setTitle={setTitle}
        setContent={setContent}
        buttonlist={[{ text: "저장", func: boardSave }]}
      />
    </>
  );

  const boardSave = async () => {
    try {
      const res = await BoardApi.boardSave(title, content, "moun");
      console.log(res.data);
      closeModal();
    } catch (e) {}
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Container>
        <WebText>
          <h1>당신의 환급금을 최고의 가치로 바꾸는 맞춤형 금융 솔루션</h1>
        </WebText>
        {/* 첫 번째 페이지: 주식 추천과 카드 추천 */}
        <SuggestionBox>
          <Box ref={firstBoxRef}>
            <SubSection1Box color="#333" isVisible={isFirstBoxVisible}>
              <CardText>
                <h2>소비는 스마트하게, 혜택은 최대한으로</h2>
                <p>
                  당신의 소비 패턴, 가장 많은 혜택으로 돌아옵니다
                  <br /> 일공이오에서 최적의 카드를 만나보세요
                </p>
              </CardText>
              <SubSection1 onClick={() => navigate("/cardpage")}></SubSection1>
            </SubSection1Box>
          </Box>
          <Box ref={secondBoxRef} style={{ background: "#333" }}>
            <SubSection1Box
              bgColor="#333"
              color="#fff"
              isVisible={isSecondBoxVisible}
            >
              <SubSection1
                onClick={() => navigate("/stocksuggestion")}
              ></SubSection1>
              <StockText>
                <h2>환급금으로 새로운 투자 기회를! 맞춤형 주식 추천</h2>
                <p>
                  스마트 투자로 미래를 설계하다
                  <br />
                  환급금으로 추천받는 유망 주식으로 더 큰 가치를 창출하세요
                </p>
              </StockText>
            </SubSection1Box>
          </Box>
        </SuggestionBox>

        {/* 두 번째 페이지: FAQ, 1:1 문의, 공지사항, 푸터 */}
        <ChirdBox>
          <HalfHeightSection style={{ height: "50vh" }}>
            <SubSection bgColor="#f8f8f8" color="#333">
              FAQ
            </SubSection>
            <SubSection bgColor="#f8f8f8" color="#333" onClick={openModal}>
              1:1 문의
            </SubSection>
          </HalfHeightSection>
          <TableSection>
            공지사항
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>작성시간</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>안녕하세요</td>
                  <td>글쓴이 이름</td>
                  <td>20xx/xx/xx</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>안녕하세요</td>
                  <td>글쓴이 이름</td>
                  <td>20xx/xx/xx</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>안녕하세요</td>
                  <td>글쓴이 이름</td>
                  <td>20xx/xx/xx</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>안녕하세요</td>
                  <td>글쓴이 이름</td>
                  <td>20xx/xx/xx</td>
                  <td>11</td>
                </tr>
              </tbody>
            </table>
          </TableSection>
        </ChirdBox>
      </Container>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={"자주 묻는 질문 작성"}
        children={modalChildren()}
      />
    </>
  );
};

export default Main;
