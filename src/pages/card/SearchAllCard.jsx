import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const SearchIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SearchCard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const result = [
        { id: 1, title: "Card 1" },
        { id: 2, title: "Card 2" },
        { id: 3, title: "Card 3" },
        // 더 많은 카드 데이터...
      ];
      setData(result);
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <SearchIn>
        <input type="search" placeholder="검색" />
      </SearchIn>

      <CardList>
        {currentItems.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
          </div>
        ))}
      </CardList>

      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PaginationButton>

        {[...Array(totalPages).keys()].map((number) => (
          <PaginationButton
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            active={currentPage === number + 1 ? "true" : undefined}
          >
            {number + 1}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default SearchCard;
