import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login"; // 로그인 컴포넌트를 가져옵니다.
import Logout from "./Logout"; // 로그아웃 컴포넌트를 가져옵니다.
import Header from "./components/LogoBar";
import axios from "axios";
import Home from "./Home";

import MemberManagement from "./MemberManagement";

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

function App() {
  const navigator = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
  }, []); // 최초 렌더링 시에만 실행되도록 빈 배열을 전달

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = accessToken;
  }, [accessToken]); // accessToken이 변경될 때마다 실행되도록 설정

  // 로그아웃 처리 함수
  const handleLogout = () => {
    console.log("ddddddd");

    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 상태 업데이트로 컴포넌트 다시 렌더링
    setAccessToken(null);
    setRefreshToken(null);

    navigator("/login");
  };
  return (
    <Routes>
      <Route path="/" element={<Home accessToken={accessToken} />} />
      <Route
        path="/members"
        element={
          <>
            <Header onLogout={handleLogout} />
            <MemberManagement />
          </>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <>
            {" "}
            <Login
              setTokens={(accessToken, refreshToken) => {
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
              }}
            />
          </>
        }
      ></Route>
    </Routes>
  );
}

export default App;
