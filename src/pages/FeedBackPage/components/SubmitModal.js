import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { ReactComponent as CloseButton } from '../../../assets/images/close-button.svg';
import { ReactComponent as SubmitCheckButton } from '../../../assets/images/submit-check.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal is above other content */
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  padding: 33px 56px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: #282828;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  width: 361px;
  height: 225px;
  z-index: 1001; /* Ensure the modal content is above the overlay */
`;


const SubmitModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContainer>
        <SubmitCheckButton />
        <Text color="#FFFFFF" fontSize="15px" fontWeight="700">
          고객님의 소중한 의견이 제출되었습니다.
          <br />더 나은 보이스라벨을 기대해주세요!
        </Text>
        <Button name={"닫기"} color={"#FFFA87"} width={"152px"} height={"39px"}   onClick={() => {
  onClose();
  navigate("/");
}}/>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SubmitModal;