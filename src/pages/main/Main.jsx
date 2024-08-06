import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
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
    </>
  );
};

export default Main;
