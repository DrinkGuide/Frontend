import styled from "styled-components";

const FooterContainer = styled.div`
  font-family: "Pretendard-Light";
  font-size : 14px;
  display: flex;
  background-color: #282828;
  height: 197px;
  width: 100vw;
  margin: 0 auto;
  align-items: center;
  color: #ffffff;
`;

const FooterContent = styled.div`
  font-family: "Pretendard-Light";
  font-size : 13px;
  margin-left : 16px;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <div>(01811)</div>
          <div> 서울시 노원구 공릉로 232 서울과학기술대학교</div>
          <div>[대표번호 : 02-970-6114]</div>
        </div>
        <br />
        <div>
          <div>멋쟁이사자처럼 대학 서울과학기술대학교</div>
          <div>김리사 김수아 노경인 이주승 박진홍 최성희</div>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};