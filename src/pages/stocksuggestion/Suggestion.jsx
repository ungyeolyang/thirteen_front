import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./StockModal"; // 모달 컴포넌트 임포트
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에 필요한 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 전체 페이지 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #121212; /* 다크 배경 */
  color: #e0e0e0; /* 텍스트 색상 */
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

// 예측 결과와 차트를 담는 컨테이너
const PredictionContainer = styled.div`
  width: 80%;
  background-color: #1f1f1f; /* 다크 배경 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #444; /* 어두운 테두리 */
  border-radius: 10px; /* 둥근 테두리 */
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
`;

// 예측 텍스트를 담는 박스
const PredictionTextBox = styled.div`
  width: 100%;
  background-color: #2c2c2c; /* 다크 배경 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
  border-radius: 10px; /* 둥근 테두리 */

  & > h2 {
    width: 100%;
    text-align: left;
    margin-left: 10px;
    color: #ffffff; /* 밝은 텍스트 */
  }
  & > h4 {
    width: 100%;
    text-align: center;
    color: #bbbbbb; /* 중간 밝기 텍스트 */
  }
`;

// 주식 차트를 담는 박스
const StockChartBox = styled.div`
  width: 100%;
  height: 500px;
  background-color: #2c2c2c; /* 다크 배경 */
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px; /* 둥근 테두리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
`;

const StockChart1 = styled.div`
  width: 35%;
  height: 80%;
  border: 2px solid white;
`;
const StockChart2 = styled.div`
  width: 35%;
  height: 80%;
  border: 2px solid white;
`;

// 검색 및 추천 섹션 컨테이너
const SearchContainer = styled.div`
  width: 80%;
  background-color: #1f1f1f; /* 다크 배경 */
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

// 검색 입력 필드
const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #2c2c2c;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px; /* 둥근 테두리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
`;

const Form = styled.form`
  width: 100%;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchResultContainer = styled.div`
  width: 100%;
  background-color: #2c2c2c;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-sizing: border-box;
  border-radius: 10px; /* 둥근 테두리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
`;

const SearchResultItem = styled.div`
  padding: 8px 12px;
  color: #e0e0e0;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: #444;
  }

  & + & {
    margin-top: 5px;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const OpenModalButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChartContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  border: 2px solid #007bff; /* 파란색 테두리 */
  width: 100%;
  max-width: 600px; /* 차트 크기 조정 */
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

// 개별 버튼 스타일
const PredictionButton = styled.li`
  background-color: #e0e0e0;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #cccccc;
  }
`;

// 표 컨테이너
const TableContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  border: 2px solid #007bff; /* 파란색 테두리 */
  text-align: center;
  color: black;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #dddddd;
  background-color: #f7f7f7;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #dddddd;
  background-color: #ffffff;
`;

const StockSuggestion = () => {
  const [isModal1Open, setModal1Open] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [inputStock, setInputStock] = useState("");
  const [searchStocks, setSearchStocks] = useState([]);
  const [price, setPrice] = useState("");
  const [stockName, setStockName] = useState(""); // 주식 이름을 입력받기 위한 state 추가
  const [results, setResults] = useState(null);
  const [predictedPrices, setPredictedPrices] = useState([]); // 예측된 주가를 저장할 state 추가
  const [latestPrice, setLatestPrice] = useState(null); // 금일 종가를 저장할 state 추가
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Flask", {
        price,
      });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "오류가 발생했습니다.");
      setResults(null);
    }
  };

  const handlePredictStock = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict_stock", {
        stock_name: stockName, // 입력된 주식명으로 Flask 서버에 요청
      });
      setPredictedPrices(response.data.predicted_prices); // 예측된 주가를 state에 저장
      setLatestPrice(response.data.latest_price);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "오류가 발생했습니다.");
      setPredictedPrices(null);
    }
    setModal1Open(true);
  };

  const getStocksName = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/stock?query=${inputStock}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response received:", res.data);
      setSearchStocks(res.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };
  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      getStocksName();
    }
  };
  const substring = (props) => {
    const tickerMatch = props.match(/\(([^)]+)\)/);
    if (tickerMatch && tickerMatch[1]) {
      const tickerNumber = tickerMatch[1];
      console.log(tickerNumber);
    } else {
      console.log("Ticker number not found");
    }
  };

  const chartData = {
    labels: ["금일", "1일 후", "2일 후", "3일 후"],
    datasets: [
      {
        label: `${stockName} 예측 주가`,
        data: [latestPrice, ...predictedPrices],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Container>
      <PredictionContainer>
        <PredictionTextBox>
          <h2>회원 예상 환급액: ???,??? 원</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="price">가격 입력:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <button type="submit">검색</button>
          </form>
          <h4>
            회원님의 예상 환급액으로 구매할 수 있는 주식 Best를 추천해드립니다!
          </h4>
        </PredictionTextBox>
        <div id="results">
          {error && <p>{error}</p>}
          {results && (
            <>
              <h2>추천 주식:</h2>
              {results.length === 0 ? (
                <p>추천 종목이 없습니다.</p>
              ) : (
                <ul>
                  {results.map((stock, index) => (
                    <li key={index}>
                      <strong>{stock.ticker}</strong>
                      <br />
                      최신 종가: {stock.latest_price}
                      <br />
                      예측 가격: {stock.predicted_price}
                      <br />
                      등락률: {stock.change_rate.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <StockChartBox>
          <StockChart1></StockChart1>
          <StockChart2></StockChart2>
        </StockChartBox>
      </PredictionContainer>
      <SearchContainer>
        <Form onSubmit={handlePredictStock}>
          <SearchInputContainer>
            <SearchInput
              placeholder="주식명을 입력하세요..."
              onChange={(e) => setStockName(e.target.value)} // stockName 상태를 업데이트
              onKeyDown={(e) => onKeyDownEnter(e)}
              type="text"
              value={stockName} // stockName 상태를 input 값으로 설정
              required
            />
            <SearchButton type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18l6-6m0 0l-6-6m6 6H4"
                />
              </svg>
            </SearchButton>
          </SearchInputContainer>
        </Form>
        <SearchResultContainer>
          {searchStocks &&
            searchStocks.map((stock) => (
              <SearchResultItem onClick={() => substring(stock.company)}>
                {stock.company}
              </SearchResultItem>
            ))}
        </SearchResultContainer>
      </SearchContainer>

      <Footer>
        <OpenModalButton onClick={() => setModal1Open(true)}>
          모달 1
        </OpenModalButton>
        <OpenModalButton onClick={() => setModal2Open(true)}>
          모달 2
        </OpenModalButton>
      </Footer>

      {predictedPrices && (
        <Modal isOpen={isModal1Open} onClose={() => setModal1Open(false)}>
          <h2>{stockName}의 3일 예측 주가</h2>
          <ChartContainer>
            {predictedPrices && latestPrice && (
              <Line data={chartData} options={chartOptions} />
            )}
          </ChartContainer>
          <ButtonContainer>
            {predictedPrices.map((price, index) => (
              <li key={index}>
                {index + 1}일 후: {price.toFixed(2)}{" "}
              </li>
            ))}
          </ButtonContainer>
        </Modal>
      )}
      {predictedPrices && (
        <Modal isOpen={isModal2Open} onClose={() => setModal2Open(false)}>
          {/* 모달 2 콘텐츠 */}
          <TableContainer>
            <h2>{stockName}의 3일 예측 주가</h2>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Day</TableHeader>
                  <TableHeader>종가</TableHeader>
                  <TableHeader>전일대비</TableHeader>
                  <TableHeader>등락률</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>금일</TableCell>
                  <TableCell>{latestPrice}</TableCell>
                  <TableCell>-</TableCell>{" "}
                  {/* 금일은 전일이 없으므로 '-' 처리 */}
                  <TableCell>-</TableCell>{" "}
                  {/* 금일은 전일이 없으므로 '-' 처리 */}
                </tr>
                {predictedPrices.map((price, index) => {
                  const previousPrice =
                    index === 0 ? latestPrice : predictedPrices[index - 1];
                  const priceDifference = price - previousPrice;
                  const changeRate = (
                    (priceDifference / previousPrice) *
                    100
                  ).toFixed(2);

                  return (
                    <tr key={index}>
                      <TableCell>{index + 1}일 후</TableCell>
                      <TableCell>{price.toFixed(0)}</TableCell>
                      <TableCell>{priceDifference.toFixed(0)}</TableCell>
                      <TableCell>{changeRate}%</TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableContainer>
        </Modal>
      )}
    </Container>
  );
};

export default StockSuggestion;
