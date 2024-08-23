import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  FaUtensils,
  FaShoppingCart,
  FaBus,
  FaStore,
  FaCoffee,
  FaHospital,
  FaBookReader,
  FaBuilding,
} from "react-icons/fa";
import { GiMirrorMirror } from "react-icons/gi";
import { HiReceiptTax, HiDotsCircleHorizontal } from "react-icons/hi";
import { MdCastForEducation } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";
import { IoIosFitness } from "react-icons/io";
import { HiMiniBuildingLibrary, HiComputerDesktop } from "react-icons/hi2";
import { GiBanknote } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaHouseChimney } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { RiFileExcelLine } from "react-icons/ri";
import Quiz from "../admin/Quiz";

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

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`;
const FileBoxAfter = styled.div`
  width: 50%;
  height: 100%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Cell = styled.div`
  width: 100%;
  height: 500px;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 20px 10px;
    gap: 10px;
    height: auto;
  }
`;
const CellB = styled.div`
  width: 100%;
  height: 500px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
    height: auto;
    min-height: 300px;
    padding: 20px 10px;
  }
`;
const FileBox = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-left: 5px;
  border-radius: 30px;
  background: ${({ color }) => color || "blue"}; /* 업종별 색상 적용 */
`;

const RightBox = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;

  @media (max-width: 1024px) {
    width: 90%;
    height: 50%;
    order: 1;
  }
`;
const Line = styled.div`
  width: 100%;
  background: #46a1cc;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DangerIcon = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: end;
  font-size: 40px;
`;

const LeftBox = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 90%;
    height: 50%;
    order: 1;
  }
`;
const SummerTop = styled.div`
  width: 100%;
  height: 50%;
`;

const SummaryBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const TotalAmount = styled.h3`
  width: 100%;
  height: 20%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const BarContainer = styled.div`
  background: #fff;
  width: 50%;
  min-width: 250px;
  height: 40px;
  margin: 5px 0;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const Bar = styled.div`
  background-color: ${({ color }) => color || "none"};
  height: 100%;
  width: ${({ width }) => width};
  color: #fff;
  text-align: center;
  line-height: 47px; /* vertically center text */
  font-weight: bold;
  border-radius: 5px 0 0 5px;
`;

const BarPercent = styled.div`
  font-weight: bold;
  margin-right: 5px;
  color: #fff;
`;

const ListItem = styled.li`
  list-style: none;
`;

const JobBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoreButton = styled.button`
  margin: 5px 0;
  width: 60%;
  padding: 10px 0;
  background-color: #c14e4e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const FileInputBox = styled.div`
  width: 100%;
  height: 80%;
  @media (max-width: 1024px) {
    min-width: 300px;
  }
`;
const FileInput = styled.input`
  display: none; /* 숨기기 */
`;

const CustomLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  width: 100%;
  height: 200px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  border: 2px dashed #fff;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    border: 2px solid #fff;
  }
`;
const Fileform = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const BtnF = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`;
const UploadButton = styled.button`
  padding: 10px 0;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#C14E4E")};
  color: white;
  border: none;
  margin-top: 5px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const CardPage = ({ data, setData, loading, setLoading, setCategory }) => {
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [file, setFile] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("Submit button clicked");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      console.log("Sending request with file:", file);
      const response = await axios.post(
        "http://192.168.10.13:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response received:", response.data);
      setData(response.data);
      setCategoryCounts(response.data.category_totals);
    } catch (error) {
      console.error("Error occurred:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && data.category_totals) {
      const filteredTopCategories = Object.entries(data.category_totals)
        .filter(([category]) => category !== "기타")
        .slice(0, 5)
        .map(([category]) => category)
        .join(",");

      setCategory(filteredTopCategories);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.category_totals) {
    return (
      <Container>
        <CellB>
          {loading ? (
            <SpinnerContainer>
              <Sbox>
                <p>
                  카드내역 분석중 입니다..사용내역에 따라 시간 소요가 될수
                  있음에 양해 부탁드립니다
                </p>
                <Spinner />
              </Sbox>
              <Quiz />
            </SpinnerContainer>
          ) : (
            <>
              <TotalAmount>카드 내역 엑셀 파일을 올려주세요</TotalAmount>
              <FileBox>
                <Fileform onSubmit={handleSubmit}>
                  <FileInputBox>
                    <CustomLabel htmlFor="fileInput">
                      <RiFileExcelLine
                        style={{ fontSize: "100px" }}
                      ></RiFileExcelLine>
                      {file ? file.name : ""}
                    </CustomLabel>
                    <FileInput
                      id="fileInput"
                      type="file"
                      accept=".xls, .xlsx"
                      onChange={handleFileChange}
                    />
                  </FileInputBox>
                  <BtnF>
                    <UploadButton
                      style={{ width: "100%" }}
                      disabled={!file}
                      type="submit"
                    >
                      파일 업로드
                    </UploadButton>
                  </BtnF>
                </Fileform>
              </FileBox>
            </>
          )}
        </CellB>
      </Container>
    );
  }

  const totalAmount = Object.values(data.category_totals).reduce(
    (a, b) => a + b,
    0
  );

  const icons = {
    식비: <FaUtensils />,
    쇼핑: <FaShoppingCart />,
    교통: <FaBus />,
    "마트/편의점": <FaStore />,
    "카페.간식": <FaCoffee />,
    "취미.여가": <IoAccessibility />,
    "이체.페이": <FaMoneyBillTransfer />,
    병원: <FaHospital />,
    서점: <FaBookReader />,
    미용: <GiMirrorMirror />,
    운동: <IoIosFitness />,
    공공기관: <HiMiniBuildingLibrary />,
    기타: <HiDotsCircleHorizontal />,
    교육: <MdCastForEducation />,
    은행: <GiBanknote />,
    pc: <HiComputerDesktop />,
    보험: <HiReceiptTax />,
    회사: <FaBuilding />,
    전자: <MdOutlineProductionQuantityLimits />,
    숙소: <FaHouseChimney />,
  };

  const colors = {
    "마트/편의점": "#ffff00",
    "카페.간식": "#c2c2f0",
    "취미.여가": "#ff3366",
    "이체.페이": "#3399ff",
    식비: "#ff9900",
    쇼핑: "#ff0000",
    교통: "#ccff00",
    병원: "#ffffff",
    서점: "#ff6600",
    미용: "#c2f0ff",
    운동: "#ffb3b3",
    회사: "#cc54aa",
    공공기관: "#ff6666",
    기타: "#aaaaaa",
    교육: "#e6e6e6",
    은행: "#66ff66",
    pc: "#99bc88",
    보험: "#37ff12",
    숙소: "#0079a2",
    전자: "#df0011",
  };

  const sortedCategories = Object.entries(data.category_totals).sort(
    (a, b) => b[1] - a[1]
  );

  const [mostUsedCategory] = sortedCategories[0] || ["없음", 0];

  const topCategories = sortedCategories
    .filter((category) => category[0] !== "기타")
    .slice(0, 5);

  return (
    <Container>
      <Cell>
        {loading ? (
          <SpinnerContainer>
            <Sbox>
              <p>
                카드내역 분석중 입니다..사용내역에 따라 시간 소요가 될수 있음에
                양해 부탁드립니다
              </p>
              <Spinner />
            </Sbox>
            <Quiz />
          </SpinnerContainer>
        ) : (
          <>
            <LeftBox>
              <SummerTop>
                <SummaryBox>
                  <TotalAmount>
                    소비내역 총액: {totalAmount.toLocaleString()} 원
                  </TotalAmount>
                  <BarContainer>
                    {topCategories.map(([category, amount]) => {
                      const percentage = (amount / totalAmount) * 100;
                      const color = colors[category] || "#d9d9d9"; // 기본 색상 설정

                      return amount > 0 ? (
                        <Bar
                          key={category}
                          color={color}
                          width={`${percentage}%`}
                          style={{ textAlign: "center", borderRadius: "0" }} // 텍스트 중앙 정렬
                        ></Bar>
                      ) : null;
                    })}
                  </BarContainer>
                  <TotalAmount>
                    소비패턴 : {mostUsedCategory}에 가장 많이 사용하셨습니다
                  </TotalAmount>
                </SummaryBox>
              </SummerTop>
              <FileBoxAfter>
                <Fileform onSubmit={handleSubmit}>
                  <FileInputBox>
                    <CustomLabel
                      style={{ fontSize: "20px" }}
                      htmlFor="fileInput"
                    >
                      <RiFileExcelLine
                        style={{ fontSize: "100px" }}
                      ></RiFileExcelLine>
                      {file ? file.name : ""}
                    </CustomLabel>
                    <FileInput
                      id="fileInput"
                      type="file"
                      accept=".xls, .xlsx"
                      onChange={handleFileChange}
                    />
                  </FileInputBox>
                  <UploadButton disabled={!file} type="submit">
                    파일 업로드
                  </UploadButton>
                </Fileform>
              </FileBoxAfter>
            </LeftBox>
            <RightBox>
              <Line></Line>
              <SummaryBox>
                <JobBox>
                  {(showAll ? sortedCategories : topCategories).map(
                    ([category, amount]) => {
                      const percentage = (amount / totalAmount) * 100;
                      const color = colors[category] || "#d9d9d9"; // 기본 색상 설정
                      return amount > 0 ? (
                        <ListItem key={category}>
                          <BarContainer
                            style={{
                              justifyContent: "space-between",
                              borderRadius: "0",
                              width: "300px",
                              height: "50px",
                              background: "#555",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <IconWrapper color={color}>
                                {icons[category]}
                              </IconWrapper>
                            </div>

                            <Bar>
                              <span style={{ fontWeight: "bold" }}>
                                {category} | {amount.toLocaleString()}
                              </span>
                            </Bar>
                            <BarPercent>{percentage.toFixed(2)}%</BarPercent>
                          </BarContainer>
                        </ListItem>
                      ) : null;
                    }
                  )}
                  <MoreButton onClick={() => setShowAll(!showAll)}>
                    {showAll ? "상위 5개만 보기" : "상세 보기"}
                  </MoreButton>
                </JobBox>
              </SummaryBox>
            </RightBox>
          </>
        )}
      </Cell>
    </Container>
  );
};

export default CardPage;
