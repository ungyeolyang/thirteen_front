import { createGlobalStyle } from "styled-components";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import HeaderFooter from "./headerFooter/HeaderFooter";
import Login from "./pages/login/Login";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import Main from "./pages/main/Main";
import StockSuggestion from "./pages/stocksuggestion/Suggestion";
import FindPage from "./pages/login/FindPage";
import AdminPage from "./pages/admin/AdminPage";
import MyPage from "./pages/my/MyPage";
import CardPage from "./pages/card/CardMain";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    
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
              <Route path="cardpage" element={<CardPage />} />
              <Route path="login" element={<LoginPage />}>
                <Route index element={<Login />} />
                <Route path="find" element={<FindPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>
              <Route path="my" element={<MyPage />} />
              <Route path="stocksuggestion" element={<StockSuggestion />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
