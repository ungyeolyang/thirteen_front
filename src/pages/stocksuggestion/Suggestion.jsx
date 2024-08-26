import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import StockModal from "./StockModal";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
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
  BarElement,
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
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 어두운 그림자 */
  border-radius: 10px; /* 둥근 테두리 */
  gap: 10px;

  & > h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: left;
    margin-left: 10px;
    color: #ffffff; /* 밝은 텍스트 */
    gap: 20px;
  }
  & > h4 {
    width: 100%;
    text-align: center;
    color: #bbbbbb; /* 중간 밝기 텍스트 */
  }
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

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  border: none;
  outline: none;
  text-align: center;

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

const ChartContainer = styled.div`
  width: 800px; /* 차트의 최대 너비 */
  height: 400px; /* 차트의 최대 높이 */
  margin: 0 auto; /* 중앙 정렬 */
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  border: 2px solid #007bff; /* 파란색 테두리 */

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #fff;
  text-align: center;
  z-index: 1000;

  @media (max-width: 1024px) {
    gap: 20px;
    flex-direction: column;
    height: auto;
  }
`;

const Sbox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 90%;
    height: 150px;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #00bfff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-right: 15px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PredictionPricesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px; /* 간격 설정 */
`;

const PredictionPriceDiv = styled.div`
  background-color: #333; /* 배경 색상 */
  color: #fff; /* 텍스트 색상 */
  padding: 10px;
  border-radius: 5px; /* 둥근 테두리 */
  border: 1px solid #444; /* 테두리 색상 */
  font-size: 20px; /* 폰트 크기 */
  text-align: center;
`;
const Div = styled.div`
  width: 20%;
`;

const StockSuggestion = () => {
  const [isModal1Open, setModal1Open] = useState(false);
  const [predictedPrices, setPredictedPrices] = useState([]);
  const [latestPrice, setLatestPrice] = useState([]);
  const [stockName, setStockName] = useState("");
  const [inputStock, setInputStock] = useState("");
  const [inputRefund, setInputRefund] = useState(0);
  const [searchStocks, setSearchStocks] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const getStocksName = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/stock?query=${inputStock}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSearchStocks(res.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  const getTop5 = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/top5?price=${inputRefund}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setResults(res.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  const getPredict = async (ticker) => {
    setLoading(true); // 로딩 시작
    try {
      const res = await axios.get(
        `http://localhost:5000/api/predict?stock=${ticker}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { latest_prices, predicted_prices } = res.data;

      if (Array.isArray(latest_prices) && Array.isArray(predicted_prices)) {
        setLatestPrice(latest_prices);
        setPredictedPrices(predicted_prices);
      } else {
        console.error("API 응답 형식이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const onKeyDownEnter = (e, func) => {
    if (e.key === "Enter") {
      func();
    }
  };

  const onClickSearch = (stock) => {
    const stockNameMatch = stock.match(/^(.*)\(/);
    const tickerMatch = stock.match(/\(([^)]+)\)/);
    if (stockNameMatch && stockNameMatch[1] && tickerMatch && tickerMatch[1]) {
      const stockName = stockNameMatch[1].trim();
      const tickerNumber = tickerMatch[1].trim();
      setStockName(stockName);
      getPredict(tickerNumber);
      setModal1Open(true);
    } else {
      console.log("Ticker number not found");
    }
  };

  const generateLabels = () => {
    const now = new Date();
    const labels = [
      ...Array(60)
        .fill(0)
        .map((_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (60 - i));
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }),
      `${now.getMonth() + 1}/${now.getDate()}`,
      ...Array(3)
        .fill(0)
        .map((_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() + (i + 1));
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }),
    ];
    return labels;
  };

  const chartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: `${stockName} 예측 주가`,
        data: [...latestPrice, ...predictedPrices],
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

  const chartData1 = {
    labels: results?.map((stock) => `${stock.name}(${stock.ticker})`) || [],
    datasets: [
      {
        label: "등락률 (%)",
        data: results?.map((stock) => stock.change_rate.toFixed(2)) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions1 = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 20, // X축 글씨 크기
          },
        },
        title: {
          display: true,
          text: "종목명",
          font: {
            size: 16, // X축 제목 글씨 크기
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 20, // Y축 글씨 크기
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // 범례 글씨 크기
          },
        },
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (tooltipItem) => {
            const { dataIndex } = tooltipItem;
            const stock = results[dataIndex]; // 현재 인덱스에 해당하는 주식 정보를 가져옵니다.

            if (stock) {
              const latestPrice = stock.latest_price.toFixed(2);
              const predictedPrice = stock.predicted_price.toFixed(2);
              const changeRate = stock.change_rate.toFixed(2);

              return [
                `현재 가격: ${latestPrice}`,
                `예측 가격: ${predictedPrice}`,
                `상승률: ${changeRate}%`,
              ];
            }

            return [];
          },
        },
        titleFont: {
          size: 16, // 툴팁 제목 글씨 크기
        },
        bodyFont: {
          size: 20, // 툴팁 본문 글씨 크기
        },
      },
    },
  };

  return (
    <>
      <Container>
        <PredictionContainer>
          <PredictionTextBox>
            <h2>
              회원 예상 환급액
              <Div>
                <SearchInputContainer>
                  <SearchInput
                    placeholder={
                      inputRefund === 0 ? "환급금을 입력하세요..." : inputRefund
                    }
                    onChange={(e) => setInputRefund(e.target.value)}
                    onKeyDown={(e) => onKeyDownEnter(e, getTop5)}
                  />
                  <span>원</span>
                  <SearchButton onClick={getTop5}>
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
              </Div>
            </h2>
            <Bar data={chartData1} options={chartOptions1} />
          </PredictionTextBox>
        </PredictionContainer>
        <SearchContainer>
          <SearchInputContainer>
            <SearchInput
              placeholder="주식명을 입력하세요..."
              onChange={(e) => setInputStock(e.target.value)}
              onKeyDown={(e) => onKeyDownEnter(e, getStocksName)}
            />
            <SearchButton onClick={getStocksName}>
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
          <SearchResultContainer>
            {searchStocks.map((stock) => (
              <SearchResultItem
                key={stock.company}
                onClick={() => onClickSearch(stock.company)}
              >
                {stock.company}
              </SearchResultItem>
            ))}
          </SearchResultContainer>
        </SearchContainer>
        {isModal1Open && (
          <StockModal
            isOpen={isModal1Open}
            onClose={() => setModal1Open(false)}
          >
            <div>
              <h2>{stockName}의 3일 예측 주가</h2>
              {loading ? (
                <SpinnerContainer>
                  <Sbox>
                    <p>주식을 예측중 입니다..</p>
                    <Spinner />
                  </Sbox>
                </SpinnerContainer>
              ) : (
                <div>
                  <ChartContainer>
                    {predictedPrices.length > 0 && latestPrice.length > 0 && (
                      <Line data={chartData} options={chartOptions} />
                    )}
                  </ChartContainer>
                  <ButtonContainer>
                    <PredictionPricesContainer>
                      {predictedPrices.map((price, index) => (
                        <PredictionPriceDiv key={index}>
                          {index + 1}일 후: {price.toFixed(2)}
                        </PredictionPriceDiv>
                      ))}
                    </PredictionPricesContainer>
                  </ButtonContainer>
                </div>
              )}
            </div>
          </StockModal>
        )}
      </Container>
    </>
  );
};

export default StockSuggestion;
