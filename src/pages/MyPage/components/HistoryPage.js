import { useState } from 'react';
import { Footer } from "../../../components/Footer";
import { ReactComponent as Changing_icon_1 } from "../../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../../assets/images/changing_icon_6.svg";
import styled from "styled-components";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
  padding: 100px 0; /* 상하 여백 추가 */
  overflow-y: auto;
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

const PurchaseItemContainer = styled.div`
  width: 90%;
  margin-bottom: 10px;
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
  overflow: hidden;
  max-height: ${(props) => (props.expanded ? '500px' : '60px')};
  padding: ${(props) => (props.expanded ? '10px 20px' : '10px 20px')};
  border: 2px solid #5D9EFF;
  border-radius: 15px;
  background-color: ${(props) => (props.expanded ? '#003366' : 'transparent')};
`;

const PurchaseItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: #5D9EFF;
  cursor: pointer;
`;

const PurchaseItemDetails = styled.div`
  display: ${(props) => (props.expanded ? 'flex' : 'none')};
  color: white;
  margin-top: 10px;
  img {
    width: 100px;
    height: auto;
    margin-right: 20px; /* 이미지와 텍스트 사이의 간격 추가 */
  }
  p {
    margin: 0;
  }
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

const HistoryPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const purchaseHistory = [
    {
      name: "포카리스웨트",
      date: "2024년 01월 01일",
      details: "영양성분: 수분, 나트륨, 칼륨, 칼슘, 마그네슘",
      image: "https://img.danawa.com/prod_img/500000/217/969/img/1969217_1.jpg?_v=20220302173222"
    },
    {
      name: "비타500",
      date: "2024년 01월 02일",
      details: "영양성분: 비타민C, 탄산수, 설탕",
      image: "/path/to/vita500.png"
    },
    {
      name: "코카콜라",
      date: "2024년 01월 03일",
      details: "영양성분: 탄산수, 설탕, 카페인, 카라멜 색소",
      image: "/path/to/cocacola.png"
    },
    {
      name: "아쿠아리우스",
      date: "2024년 01월 04일",
      details: "영양성분: 수분, 나트륨, 칼륨, 칼슘, 마그네슘",
      image: "/path/to/aquarius.png"
    },
    {
      name: "파워에이드",
      date: "2024년 01월 05일",
      details: "영양성분: 수분, 나트륨, 칼륨, 칼슘, 마그네슘",
      image: "/path/to/powerade.png"
    },
    {
      name: "레몬에이드",
      date: "2024년 01월 06일",
      details: "영양성분: 물, 레몬즙, 설탕, 비타민C",
      image: "/path/to/lemonade.png"
    },
    {
      name: "환타",
      date: "2024년 01월 07일",
      details: "영양성분: 탄산수, 설탕, 인공향료, 색소",
      image: "/path/to/fanta.png"
    },
    {
      name: "사이다",
      date: "2024년 01월 08일",
      details: "영양성분: 탄산수, 설탕, 인공향료",
      image: "/path/to/cider.png"
    }
    // ...더 많은 상품 데이터 추가 가능
  ];

  const icons = [
    <Changing_icon_1 />,
    <Changing_icon_2 />,
    <Changing_icon_3 />,
    <Changing_icon_4 />,
    <Changing_icon_5 />,
    <Changing_icon_6 />,
  ];

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <HistoryContainer>
        <HistoryTextBox fontSize="24px" fontColor="#ffffff" margin="0 0 60px 0">
          구매한 상품 이력
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff" margin="0">
          이번달 구매 인증
        </HistoryTextBox>
        <PurchaseImageContainer>
          {icons.map((icon, index) => (
            <Circle key={index}>{icon}</Circle>
          ))}
          {[...Array(4)].map((_, index) => (
            <Circle key={icons.length + index}></Circle>
          ))}
        </PurchaseImageContainer>
        <HistoryTextBox fontSize="16px" fontColor="#FFFA87" margin="0 0 40px 0">
          이번 달에는 구매 인증을 6회 했어요.
          <br />
          4회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff" margin="0">
          구매한 상품 히스토리
        </HistoryTextBox>
        <PurchaseHistoryList>
          {purchaseHistory.map((item, index) => (
            <PurchaseItemContainer
              key={index}
              expanded={expandedIndex === index}
            >
              <PurchaseItemHeader onClick={() => handleExpandClick(index)}>
                <span>{item.name}</span>
                <span>{item.date} 구매</span>
              </PurchaseItemHeader>
              <PurchaseItemDetails expanded={expandedIndex === index}>
                <img src={item.image} alt={item.name} />
                <p>{item.details}</p>
              </PurchaseItemDetails>
            </PurchaseItemContainer>
          ))}
        </PurchaseHistoryList>      
      </HistoryContainer>
      <Footer />

    </>
  );
};

export default HistoryPage;
