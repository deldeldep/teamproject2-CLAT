import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import '../style/loginPage.scss';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    // 로그인 로직 구현 예정
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2 className="login-title">Log In</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="button" className="find-pw-btn">비밀번호 찾기</button>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-submit-btn">Log In</button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* 하단 버튼 그룹 */}
        <div className="auth-footer-buttons">
            <Link to="/signup" className="create-account-btn" style={{ textDecoration: 'none' }}>
                Create an Account
            </Link>
            <button className="google-signup-btn">
                <FcGoogle />Google Account SignUp
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;