import React, { useEffect, useState } from 'react';
import Login from './Login'; // 로그인 컴포넌트를 가져옵니다.
import MemberManagement from './MemberManagement';
import Logout from './Logout'; // 로그아웃 컴포넌트를 가져옵니다.
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  useEffect(() => { 
    setAccessToken(localStorage.getItem('accessToken'));
    setRefreshToken(localStorage.getItem('refreshToken'));
  }, []); // 최초 렌더링 시에만 실행되도록 빈 배열을 전달
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }, [accessToken]); // accessToken이 변경될 때마다 실행되도록 설정
  
  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // 상태 업데이트로 컴포넌트 다시 렌더링
    setAccessToken(null);
    setRefreshToken(null);
  };
  return (
    <div>
      {accessToken ? (
        <div>
          <Logout onLogout={handleLogout} />
          <MemberManagement/>
        </div>
      ) : (
        <Login setTokens = {
          (accessToken, refreshToken) => {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          }
        } />
      )}
    </div>
  );
}

export default App;
