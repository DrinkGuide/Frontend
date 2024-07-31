import { ReactComponent as CloseButton } from "../../../assets/images/close-button.svg";
import { ReactComponent as SubmitCheckButton } from "../../../assets/images/submit-check.svg";
import styled from "styled-components";

const ModalContainer = styled.div`
  box-sizing: border-box;
  padding: 33px 56px 33px 56px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  row-gap: 0px;
  background: #282828;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  width: 361px;
  height: 225px;
`;

const ModalText = styled.div`
  padding: ;
  position: relative;
  color: #ffffff;
  font-family: "PretendardVariable-Bold", sans-serif;
  font-size: 13.5px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  text-align: center;
`;
const SubmitModal = () => {
  return (
    <ModalContainer>
      <SubmitCheckButton />
      <ModalText>
        고객님의 소중한 의견이 제출되었습니다.
        <br />더 나은 보이스라벨을 기대해주세요!
      </ModalText>
      <CloseButton />
    </ModalContainer>
  );
};

export default SubmitModal;
