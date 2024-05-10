import React, { useEffect, useState } from 'react';
import Login from './Login'; // 로그인 컴포넌트를 가져옵니다.
import MemberManagement from './MemberManagement';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  useEffect(() => { 
    setAccessToken(localStorage.getItem('accessToken'));
    setRefreshToken(localStorage.getItem('refreshToken'));
    console.log('accessToken:', accessToken);
    console.log('refreshToken:', refreshToken);
  }, []); // 최초 렌더링 시에만 실행되도록 빈 배열을 전달
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }, [accessToken]); // accessToken이 변경될 때마다 실행되도록 설정
  
//   // refreshToken을 받은 후 쿠키에 저장하는 코드
//   const setRefreshTokenCookie = (refreshToken) => {
//   const cookieOptions = {
//     path: '/', // 모든 경로에서 접근 가능하도록 설정
//     httpOnly: true, // JavaScript에서 쿠키에 접근 불가능하도록 설정
//     secure: true, // HTTPS에서만 쿠키를 전송하도록 설정
//     sameSite: 'strict' // CSRF 공격 방지를 위해 SameSite 설정
//   };

//   document.cookie = `refreshToken=${refreshToken}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
// };
// useEffect(() => {
//   setRefreshTokenCookie(refreshToken);
// }, [refreshToken]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

  return (
    <div>
      {accessToken ? (
        <MemberManagement/>
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
