import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default LoginPage;
