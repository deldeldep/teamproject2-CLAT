import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../style/cartPage.scss';

const CartPage = () => {
    // 1. 카트 아이템
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Rose Essence Perfume', price: 85000, quantity: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Woody Night Eau de Toilette', price: 92000, quantity: 2, image: 'https://via.placeholder.com/100' },
    ]);

    // 2. 추천 상품 (랜덤 5개)
    const [recommendedItems, setRecommendedItems] = useState([]);

    useEffect(() => {
        const allPerfumes = [
        { id: 101, name: 'Velvet Rose', image: 'https://via.placeholder.com/200' },
        { id: 102, name: 'Santal Mystique', image: 'https://via.placeholder.com/200' },
        { id: 103, name: 'Citrus Spark', image: 'https://via.placeholder.com/200' },
        { id: 104, name: 'Oud Noir', image: 'https://via.placeholder.com/200' },
        { id: 105, name: 'Jasmine Bloom', image: 'https://via.placeholder.com/200' },
        { id: 106, name: 'Ocean Breeze', image: 'https://via.placeholder.com/200' },
        { id: 107, name: 'Lavender Calm', image: 'https://via.placeholder.com/200' },
        ];
        const shuffled = [...allPerfumes].sort(() => 0.5 - Math.random());
        setRecommendedItems(shuffled.slice(0, 5));
    }, []);

    // 3. 수량 변경 함수
    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
        prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        );
    };

    // 4. 상품 삭제 함수
    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // 5. 금액 계산 로직
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 100000 || subtotal === 0 ? 0 : 3000;
    const total = subtotal + shipping;

    return (
        <div className="cart-page-container">
            <div className="cart-main-layout">
                {/*카트 리스트 */}
                <section className="cart-list-section">
                    <h2 className="section-title">My Cart</h2>
                    <div className="cart-header">
                        <span>상품</span>
                        <span>수량</span>
                        <span>가격</span>
                        <span></span>
                    </div>

                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="product-info">
                                <div className="img-box"><img src={item.image} alt={item.name} /></div>
                                <span className="product-name">{item.name}</span>
                            </div>
                            <div className="quantity-control">
                                <button onClick={() => updateQuantity(item.id, -1)}><FiMinus size={14}/></button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}><FiPlus size={14}/></button>
                            </div>
                            <div className="price-box">{(item.price * item.quantity).toLocaleString()} ₩</div>
                            <button className="delete-btn" onClick={() => removeItem(item.id)}><FiTrash2 size={18} /></button>
                        </div>
                    ))}
                    {cartItems.length === 0 && <p className="empty-msg">장바구니가 비었습니다.</p>}
                </section>

                {/* 합계 */}
                <aside className="summary-section">
                    <h3 className="summary-title">결제 예상 금액</h3>
                    <div className="coupon-area">
                        <input type="text" placeholder="your coupon code" />
                        <button>확인</button>
                    </div>
                    <div className="summary-details">
                        <div className="detail-row"><span>상품 금액</span><span>{subtotal.toLocaleString()} ₩</span></div>
                        <div className="detail-row"><span>배송비</span><span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()} ₩`}</span></div>
                        <div className="total-row"><span>총 결제 금액</span><span>{total.toLocaleString()} ₩</span></div>
                    </div>
                    <div className="checkout-buttons">
                        <button className="btn-black">결제</button>
                        <button className="btn-white">비회원 구매</button>
                    </div>
                </aside>
            </div>

            {/* 추천 */}
            <section className="recommendation-section">
                <h2 className="recommend-title">You May Like</h2>
                <Swiper
                spaceBetween={25}
                slidesPerView={1}
                grabCursor={true}
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
                >
                {recommendedItems.map(item => (
                    <SwiperSlide key={item.id}>
                    <div className="recommend-card">
                        <div className="recommend-img"><img src={item.image} alt={item.name} /></div>
                        <p>{item.name}</p>
                        <button className="watch-btn">watch product <FiArrowRight size={14} /></button>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </section>
        </div>
    );
};

export default CartPage;