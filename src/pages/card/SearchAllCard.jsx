import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import CardModal from "./CardModal";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ececec;
  gap: 30px;
  overflow: hidden;
`;

const AllCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-size: 25px;
  color: #fff;
  background: #c14e4e;
`;

const Cardbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  flex: 0 0 calc(20%);
  position: relative;
  width: 100%;
  height: 550px;
  display: flex;
  perspective: 1000px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    position: absolute;
    bottom: 5%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 5px;
    margin: 0;
    z-index: 1;
  }
`;

const CardInner = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease;

  &:hover {
    transform: rotateY(180deg) translateY(-10px);
  }
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  cursor: pointer;
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

const CardSize = styled.div`
  width: ${({ isPortrait }) => (isPortrait ? "209px" : "auto")};
  height: ${({ isPortrait }) => (isPortrait ? "331px" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const PageButton = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 50px;
  border: none;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  padding: 0 10px;

  &:disabled {
    background-color: #adadad;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 25px;
    font-size: 16px;
  }
`;
const Input = styled.input`
  width: 50%;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  font-size: 25px;
  outline: none;
  border: none;
  color: #fff;
  text-align: center;

  &::placeholder {
    color: #fff;
    font-size: 30px;
  }
  &:focus {
    border: 1px solid blue;
    background: #fff;
    color: #000;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
  @media (max-width: 425px) {
    width: 90%;
  }
`;

// 이미지의 가로/세로 비율에 따라 회전 처리 및 크기 설정
const ImageCard = ({ src }) => {
  const imgRef = useRef(null);
  const [rotate, setRotate] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const img = imgRef.current;

    if (img) {
      img.onload = () => {
        const isLandscape = img.naturalWidth > img.naturalHeight;
        setRotate(isLandscape ? 90 : 0);
        setIsPortrait(!isLandscape);
      };
    }
  }, [src]);

  return (
    <CardSize isPortrait={isPortrait}>
      <CardImage ref={imgRef} src={src} rotate={rotate} />
    </CardSize>
  );
};

// 스타일이 적용된 이미지 컴포넌트
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: transform 0.3s ease;
`;

const SearchCard = ({ setSelectedCard, onImageLoaded }) => {
  const [searchCards, setSearchCards] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;

  const rpad = (str, length, padString) => {
    if (str.length > 20) {
      str = str.slice(0, 17);
      while (str.length < length) {
        str += padString;
      }
    }
    return str;
  };

  useEffect(() => {
    const getCard = async () => {
      // console.log("input", inputSearch);
      const addr = inputSearch
        ? `http://localhost:5000/api/card?query=${inputSearch}`
        : `http://localhost:5000/api/card?query=`;
      try {
        const res = await axios.get(addr, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response received:", res.data);
        setSearchCards(res.data);
        if (onImageLoaded) {
          // 이미지 로드 시 콜백 호출
          const randomCard =
            res.data[Math.floor(Math.random() * res.data.length)];
          onImageLoaded(randomCard.cimage);
        }
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };
    getCard();
  }, [inputSearch, onImageLoaded]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchCards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(searchCards.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤을 원할 경우 사용
    });
  };

  const getPageButtons = () => {
    const maxButtons = 5;

    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Container>
      <AllCard>
        <p>ALL CARD</p>
      </AllCard>
      <Input
        placeholder="검색"
        onChange={(e) => {
          setInputSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      <Cardbox>
        {currentCards.map((card, index) => (
          <Card key={index}>
            <CardInner>
              <CardFront>
                <ImageCard src={card.cimage} />
              </CardFront>
              <CardBack>
                <LineB></LineB>
                <CardText>
                  <h2>{card.ccname}</h2>
                  <ModalBtn onClick={() => setSelectedCard(card)}>
                    <p>자세히 보기</p>
                  </ModalBtn>
                </CardText>
              </CardBack>
            </CardInner>
            <h3>{rpad(card.cname, `20`, `.`)}</h3>
          </Card>
        ))}
      </Cardbox>
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </PageButton>
        {getPageButtons().map((number) => (
          <PageButton
            key={number}
            onClick={() => handlePageChange(number)}
            disabled={number === currentPage}
          >
            {number}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default SearchCard;
