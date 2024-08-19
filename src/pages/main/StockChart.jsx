import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  // 예시 데이터
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // X축 레이블 (날짜)
    datasets: [
      {
        label: "Stock Price",
        data: [120, 135, 110, 150, 170, 180, 160], // 주식 가격 데이터
        borderColor: "rgba(75,192,192,1)", // 라인 색상
        backgroundColor: "rgba(75,192,192,0.2)", // 배경 색상 (라인 아래 채우기)
        tension: 0.2, // 선의 곡률 (0일 경우 직선)
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

  return <Line data={data} options={options} />;
};

export default StockChart;
