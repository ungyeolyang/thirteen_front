// Main.js
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Modal from "../../component/Modal";
import BoardModalContent from "../admin/BoardModalContent";
import BoardApi from "../../api/BoardAxiosApi";
import { useNavigate } from "react-router-dom";
import StockChart from "./StockChart";
import RollingSlide from "./RollingSlide"; // 추가된 컴포넌트
import axios from "axios";
import FAQ from "./FaqBox";
import AdGong from "../admin/AdGong";

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

const fadeInAnimation = css`
  animation: ${fadeIn} 0.8s forwards;
`;

const WebText = styled.div`
  width: 70%;
  height: 50vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
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

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const ChirdBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const HalfHeightSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 20px 0;
`;

const SubSection1Box = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardText = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  line-height: 2;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 20px;
  }
`;

const StockText = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  line-height: 2;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 20px;
  }
`;

const SubSection1 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 20px;
  }
`;
const CardPageGo = styled.div`
  /* position: absolute; */
  width: 300px;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  &:hover {
    background: #666;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }

  @media (max-width: 425px) {
    font-size: 16px;
  }
`;
const CardBox = styled.div`
  width: 100vw;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
`;

const StockBox = styled.div`
  width: 100%;
  height: 100px;
  background: none;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  ${(props) => props.isVisible && fadeInAnimation};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: absolute;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.3);
  }

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #777;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover div {
    opacity: 1;
  }
`;

const SubSection = styled.div`
  width: 70%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Div = styled.div`
  width: 100%;
  height: 70px;
  color: #fff;
  background: #9e9e9e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-bottom: 10px;
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
  const [isStockBoxVisible, setIsStockBoxVisible] = useState(false);
  const [searchCards, setSearchCards] = useState([]);
  const [slideImages, setSlideImages] = useState([]);

  const navigate = useNavigate();

  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const stockBoxRef = useRef(null);

  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await axios.get(
          `http://192.168.10.13:5000/api/card?query=${""}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSearchCards(res.data);
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };
    getCard();
  }, []);

  useEffect(() => {
    if (searchCards.length > 0) {
      // 무작위로 7개의 이미지를 선택합니다.
      const images = searchCards
        .map((card) => card.cimage) // cimage가 이미지 URL을 포함한다고 가정
        .sort(() => Math.random() - 0.5) // 무작위로 섞기
        .slice(0, 7); // 상위 7개 이미지 선택
      setSlideImages(images);
    }
  }, [searchCards]);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.7, // 요소의 100%가 보일 때 나옴
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
        if (entry.target === stockBoxRef.current) {
          if (entry.isIntersecting && !isStockBoxVisible) {
            setIsStockBoxVisible(true);
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
    if (stockBoxRef.current) {
      observer.observe(stockBoxRef.current);
    }

    return () => {
      if (firstBoxRef.current) {
        observer.unobserve(firstBoxRef.current);
      }
      if (secondBoxRef.current) {
        observer.unobserve(secondBoxRef.current);
      }
      if (stockBoxRef.current) {
        observer.unobserve(stockBoxRef.current);
      }
    };
  }, [isFirstBoxVisible, isSecondBoxVisible, isStockBoxVisible]);

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
              <SubSection1>
                <CardBox>
                  <RollingSlide images={slideImages} />
                </CardBox>
                <CardPageGo onClick={() => navigate("/cardpage")}>
                  카드추천 페이지 이동
                </CardPageGo>
              </SubSection1>
            </SubSection1Box>
          </Box>
          <Box ref={secondBoxRef} style={{ background: "#333" }}>
            <SubSection1Box
              bgColor="#333"
              color="#fff"
              isVisible={isSecondBoxVisible}
            >
              <SubSection1>
                <StockChart />
                <StockBox ref={stockBoxRef} isVisible={isStockBoxVisible}>
                  <div onClick={() => navigate("/stocksuggestion")}>
                    주식추천 페이지 이동
                  </div>
                </StockBox>
              </SubSection1>
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
        <ChirdBox>
          <HalfHeightSection>
            <SubSection bgColor="#f8f8f8" color="#333">
              <Div>FAQ</Div>
              <FAQ />
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
