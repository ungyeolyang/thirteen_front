import { createGlobalStyle } from "styled-components";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import HeaderFooter from "./headerFooter/HeaderFooter";
import Login from "./pages/login/Login";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import Main from "./pages/main/Main";
import Suggestion from "./pages/suggestion/Suggestion";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    font-family: "Silver";
  }`;

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<HeaderFooter />}>
              <Route index element={<Main />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="suggestion" element={<Suggestion />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
