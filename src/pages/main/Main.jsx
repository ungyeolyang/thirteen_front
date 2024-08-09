import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
`;

const FullPageSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
`;

const HalfHeightSection = styled.div`
  width: 80%;
  height: 40vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
`;

const SubSection1Box = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.bgColor || "#fff"};
  color: ${(props) => props.color || "#000"};
  font-size: 22px;
  font-weight: bold;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SubSection1 = styled.div`
  width: 60%;
  height: 80%;
  border: red 2px solid;
`;
const SubSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.bgColor || "#fff"};
  color: ${(props) => props.color || "#000"};
  font-size: 22px;
  font-weight: bold;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
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
  const navigate = useNavigate();
  const onClickLogout = () => {
    alert("로그아웃 됐습니다");
    localStorage.clear();
  };
  return (
    <Container>
      <p
        onClick={() => {
          navigate("my");
        }}
      >
        마이페이지입니다.
      </p>
      <p onClick={onClickLogout}>로그아웃</p>
      {/* 첫 번째 페이지: 주식 추천과 카드 추천 */}
      <FullPageSection bgColor="#f7f7f7">
        <HalfHeightSection>
          <SubSection1Box bgColor="#f8f8f8" color="#333">
            카드 추천
            <SubSection1></SubSection1>
          </SubSection1Box>
        </HalfHeightSection>
        <HalfHeightSection>
          <SubSection1Box bgColor="#333" color="#fff">
            <SubSection1></SubSection1>
            주식 추천
          </SubSection1Box>
        </HalfHeightSection>
      </FullPageSection>

      {/* 두 번째 페이지: FAQ, 1:1 문의, 공지사항, 푸터 */}
      <FullPageSection>
        <HalfHeightSection>
          <SubSection bgColor="#f8f8f8" color="#333">
            FAQ
          </SubSection>
          <SubSection bgColor="#f8f8f8" color="#333">
            1:1 문의
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
      </FullPageSection>
    </Container>
  );
};

export default Main;
