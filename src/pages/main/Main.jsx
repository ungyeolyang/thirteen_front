import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    alert("로그아웃 됬습니다");
    localStorage.clear();
  };
  return (
    <>
      <p>메인입니다.</p>
      <p
        onClick={() => {
          navigate("my");
        }}
      >
        마이페이지입니다.
      </p>
      <p onClick={onClickLogout}>로그아웃</p>
    </>
  );
};

export default Main;
