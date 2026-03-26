import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// 임시 홈 컴포넌트 (로그인/회원가입 페이지 구현 전까지 사용)
const Home = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>ÉCLAT</h1>
    <Link to="/cart" style={{ fontSize: '20px', color: '#333' }}>카트 페이지로 이동하기</Link>
  </div>
);

function App() {
  return (
    <Router>
      {/* 네비게이션 바 (선택 사항: 페이지 전환 확인용) */}
      <nav style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/cart" style={{ marginRight: '20px' }}>Cart</Link>
        <Link to="/login">login</Link>
      </nav>

      {/* 실제 페이지들이 갈아끼워지는 영역 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;