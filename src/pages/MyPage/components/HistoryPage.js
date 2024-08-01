import { Footer } from "../../../components/Footer";
import { ReactComponent as Changing_icon_1 } from "../../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../../assets/images/changing_icon_6.svg";
import styled from "styled-components";

/*
해야할 것들

1. 아이콘 정리해서 구매 인증에 따라 아이콘 보이게 하는 로직 작성
2. 상품 버튼 누르면 상세정보 나오게 하는 애니메이션 구현
3. footer에서 글자를 어떻게 좀 더 왼쪽으로 옮길지 고민..
4. 마이페이지에서 링크 매핑하기
5. 중복되는 것들 함수로 구현해서 정리하기
*/

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 화면 높이 맞춤 */
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
  padding: 20px 0; /* 상하 여백 추가 */
`;

const HistoryTextBox = styled.div`
  color: ${(props) => props.fontColor};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  line-height: 150%;
  letter-spacing: -0.011em;
  font-weight: 700;
  margin: ${(props) => props.margin || '10px 0'}; /* 기본 여백 설정 */
`;

const PurchaseHistoryList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PurchaseItem = styled.div`
  width: 90%;
  color: #5D9EFF;
  border: 2px solid #5D9EFF;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px 20px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: 700;
`;

const PurchaseImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 20px;
  padding: 20px;
  margin: 15px 0;
  width: 80%;
  place-items: center; 

`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #444;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PurchaseImage = styled.img`
  width: 30px;
  height: 30px;
`;

const HistoryPage = () => {
  return (
    <>
      <HistoryContainer>
        <HistoryTextBox fontSize="24px" fontColor="#ffffff" margin="60px 0">
          구매한 상품 이력
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff" margin="0">
          이번달 구매 인증
        </HistoryTextBox>
        <PurchaseImageContainer>
          <Circle>
            <Changing_icon_1 />
          </Circle>
          <Circle>
            <Changing_icon_2 />
          </Circle>
          <Circle>
            <Changing_icon_3 />
          </Circle>
          <Circle>
            <Changing_icon_4 />
          </Circle>
          <Circle>
            <Changing_icon_5 />
          </Circle>
          <Circle>
            <Changing_icon_6 />
          </Circle>
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
        </PurchaseImageContainer>
        <HistoryTextBox fontSize="16px" fontColor="#FFFA87" margin="0 0 40px 0">
          이번 달에는 구매 인증을 2회 했어요.
          <br />
          8회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff" margin="0">
          구매한 상품 히스토리
        </HistoryTextBox>
        <PurchaseHistoryList>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
          <PurchaseItem>
            <span>포카리스웨트</span>
            <span>2024년 01월 01일 구매</span>
          </PurchaseItem>
        </PurchaseHistoryList>
      </HistoryContainer>
      <Footer />
    </>
  );
};

export default HistoryPage;
