import styled from "styled-components";
import CardPage from "./CardEx";
import SearchCard from "./SearchAllCard";
import CardTop from "./CardTop";
import { useEffect, useState } from "react";
import axios from "axios";
import CardModal from "./CardModal";

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

const SearchPage = styled.div`
  width: 100%;
  height: auto;
`;

const CardMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // 모달 상태 추가

  return (
    <Container>
      <CardPage
        category={category}
        setCategory={setCategory}
        setLoading={setLoading}
        loading={loading}
        data={data}
        setData={setData}
      />
      {data && (
        <Second>
          <CardTop data={data} loading={loading} category={category} />
        </Second>
      )}
      <SearchPage>
        <SearchCard setSelectedCard={setSelectedCard} />
      </SearchPage>
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </Container>
  );
};

export default CardMain;
