import React, { useState } from 'react';
import '../style/signUpPage.scss';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        agreePrivacy: false,
    });

    // 에러 메시지를 저장할 상태
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const idReg = /^(?=.*\d)[a-zA-Z][a-zA-Z0-9]{4,12}$/;
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@$%*#?&]).{8,16}$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({ ...prev, [name]: inputValue }));

        // 실시간 유효성 검사 (선택 사항)
        validateField(name, inputValue);
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        if (name === 'name') {
        if (!idReg.test(value)) errorMsg = '아이디는 영문 + 숫자 4~12자여야 합니다.';
        else errorMsg = '올바른 입력값입니다.';
        }

        if (name === 'password') {
        if (!pwReg.test(value)) errorMsg = '영문+숫자+특수문자 포함 8~16자여야 합니다.';
        else errorMsg = '올바른 입력값입니다.';
        }

        if (name === 'confirmPassword') {
        if (value !== formData.password) errorMsg = '비밀번호가 일치하지 않습니다.';
        else errorMsg = '비밀번호가 일치합니다.';
        }

        if (name === 'email') {
        if (value.trim() === '') errorMsg = '이메일을 입력해주세요.';
        else if (!emailReg.test(value)) errorMsg = '이메일 형식이 올바르지 않습니다.';
        else errorMsg = '올바른 입력값입니다.';
        }

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 최종 전송 전 모든 필드 재검사
        const isAllValid = 
        idReg.test(formData.name) && 
        pwReg.test(formData.password) && 
        formData.password === formData.confirmPassword &&
        emailReg.test(formData.email) &&
        formData.agreePrivacy;

        if (isAllValid) {
        alert('회원가입 완료');
        } else {
        alert('입력 양식을 다시 확인해주세요.');
        }
    };

    return (
        <div className="signup-page-wrapper">
        <div className="signup-container">
            <h2 className="signup-title">회원가입</h2>

            <form className="signup-form" onSubmit={handleSubmit}>
            {/* 이름(아이디용 정규식 적용) */}
            <div className="input-group">
                <label>아이디<span className="required">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <p className={`msg ${errors.name.includes('올바른') ? 'success' : 'error'}`}>{errors.name}</p>
            </div>

            <div className="input-group">
                <label>이메일<span className="required">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <p className={`msg ${errors.email.includes('올바른') ? 'success' : 'error'}`}>{errors.email}</p>
            </div>

            <div className="input-group">
                <label>비밀번호<span className="required">*</span></label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <p className={`msg ${errors.password.includes('올바른') ? 'success' : 'error'}`}>{errors.password}</p>
            </div>

            <div className="input-group">
                <label>비밀번호 확인<span className="required">*</span></label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                <p className={`msg ${errors.confirmPassword.includes('일치합니다') ? 'success' : 'error'}`}>{errors.confirmPassword}</p>
            </div>

            {/* 전화번호 */}
            <div className="input-group">
                <label>전화번호</label>
                <input type="tel" name="phone" onChange={handleChange} />
            </div>

            {/* 주소 */}
            <div className="input-group">
                <label>주소</label>
                <input type="text" name="address" onChange={handleChange} />
            </div>

            {/* 약관 동의 */}
            <div className="checkbox-section">
                <div className="checkbox-group">
                <input 
                    type="checkbox" 
                    id="agreePrivacy" 
                    name="agreePrivacy" 
                    onChange={handleChange} 
                    required 
                />
                <label htmlFor="agreePrivacy">개인정보 처리 방침 동의<span className="required">*</span></label>
                </div>
                <div className="checkbox-group">
                <input 
                    type="checkbox" 
                    id="agreeMarketing" 
                    name="agreeMarketing" 
                    onChange={handleChange} 
                />
                <label htmlFor="agreeMarketing">광고 메일 수신 동의</label>
                </div>
            </div>
            <button type="submit" className="signup-submit-btn">회원가입</button>
            </form>
        </div>
        </div>
    );
};

export default SignUpPage;