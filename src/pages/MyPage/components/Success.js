import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Success = () => {
    const [paymentApproved, setPaymentApproved] = useState(false); // 결제 승인 상태
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const orderId = urlParams.get('orderId');
    const paymentKey = urlParams.get('paymentKey');

    const postPaymentApproval = async (amount, orderId, paymentKey) => {
        // const apiUrl = "http://localhost:8080/api/v1/payments/approve"; // 백엔드 API URL
        const apiUrl = "https://www.drinkguide.store/api/v1/payments/approve"; // 백엔드 API URL
        const body = {
            amount,
            orderId,
            paymentKey,
        };

        try {
            const response = await axios.patch(apiUrl, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // 응답 데이터 처리
            console.log("결제 승인 성공:", response.data);
            if (response.data.success) {
                setPaymentApproved(true); // 결제 승인 상태 업데이트
                // 다음 페이지로 이동
                window.location.href = '/subscribe'; // 적절한 URL로 수정
            } else {
                setErrorMessage('결제 승인 실패: ' + response.data.message);
            }
        } catch (error) {
            if (error.response) {
                console.error("결제 승인 실패:", error.response.data);
                setErrorMessage('결제 승인 실패: ' + error.response.data.message);
            } else {
                console.error("결제 승인 API 호출 중 오류 발생:", error.message);
                setErrorMessage('결제 승인 API 호출 중 오류 발생: ' + error.message);
            }
        }
    };

    useEffect(() => {
        // URL 파라미터가 있는 경우에만 승인 요청을 보냄
        if (amount && orderId && paymentKey && !paymentApproved) {
            postPaymentApproval(amount, orderId, paymentKey);
        }
    }, [amount, orderId, paymentKey, paymentApproved]); // 의존성 배열에 상태 추가

    return (
        <div>
            <h2>결제가 완료되었습니다.</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {!paymentApproved && <p>결제 승인 요청 중입니다...</p>}
        </div>
    );
};

export default Success;
