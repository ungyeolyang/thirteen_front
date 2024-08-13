import React, { useState } from "react";
import axios from "axios";

const Flask = () => {
  const [price, setPrice] = useState("");
  const [stockName, setStockName] = useState(""); // 주식 이름을 입력받기 위한 state 추가
  const [results, setResults] = useState(null);
  const [predictedPrices, setPredictedPrices] = useState(null); // 예측된 주가를 저장할 state 추가
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
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "오류가 발생했습니다.");
      setPredictedPrices(null);
    }
  };

  return (
    <div>
      <h1>주식 추천 시스템</h1>
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

      <form onSubmit={handlePredictStock}>
        <label htmlFor="stockName">주식 이름 입력:</label>
        <input
          type="text"
          id="stockName"
          name="stockName"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          required
        />
        <button type="submit">3일 예측</button>
      </form>

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

        {predictedPrices && (
          <>
            <h2>{stockName}의 3일 예측 주가:</h2>
            <ul>
              {predictedPrices.map((price, index) => (
                <li key={index}>
                  Day {index + 1}: {price.toFixed(2)}{" "}
                  {/* 예측된 주가를 소수점 2자리로 표시 */}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Flask;
