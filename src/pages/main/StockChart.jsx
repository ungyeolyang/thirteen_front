import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 스타일이 적용된 div로 감싸는 예시
const ChartContainer = styled.div`
  width: 100%;
  height: 80%; /* 필요에 따라 조정 */
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 80%;
  }
`;

const StyledCanvas = styled.canvas`
  width: 100% !important;
  height: 100% !important;
`;

const StockChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Stock Price",
        data: [120, 135, 110, 150, 170, 180, 160],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Price Over Time",
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
  };

  return (
    <ChartContainer>
      <Line data={data} options={options} canvas={StyledCanvas} />
    </ChartContainer>
  );
};

export default StockChart;
