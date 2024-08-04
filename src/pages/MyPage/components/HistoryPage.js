import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Footer } from "../../../components/Footer";
import { ProductTypeColorAtom } from "../../../recoil/atom";
import { getSpeech } from "../../../components/getSpeech";
import { ReactComponent as Changing_icon_1 } from "../../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../../assets/images/changing_icon_6.svg";
import { getAccessTokenAtom } from "../../../recoil/atom";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
  padding: 100px 0; /* 상하 여백 추가 */
  overflow-y: auto;
  overflow-y: auto;
`;

const HistoryTextBox = styled.div`
  color: ${(props) => props.fontColor};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  line-height: 150%;
  letter-spacing: -0.011em;
  font-weight: 700;
  margin: ${(props) => props.margin || "10px 0"}; /* 기본 여백 설정 */
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
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  border-radius: 15px;
  margin-bottom: 10px;
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
  overflow: hidden;
  max-height: ${(props) => (props.expanded ? "500px" : "60px")};
  padding: ${(props) => (props.expanded ? "10px 20px" : "10px 20px")};
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: 700;
  background-color: ${(props) => (props.expanded ? "#003366" : "transparent")};
`;

const PurchaseItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: #5d9eff;
  cursor: pointer;
  width: 100%; /* 부모 컨테이너의 너비에 맞춤 */

  span {
    flex: 1;

    &:first-child {
      text-align: left; /* 첫 번째 span은 왼쪽 정렬 */
    }

    &:last-child {
      text-align: right; /* 마지막 span은 오른쪽 정렬 */
    }
  }
`;

const PurchaseItemDetails = styled.div`
  display: ${(props) => (props.expanded ? "flex" : "none")};
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
  const [historyData, setHistoryData] = useState([]); // 전체 구매 내역 저장
  const productColor = useRecoilValue(ProductTypeColorAtom);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [purchaseNum, setPurchaseNum] = useState(); //구매 횟수 변수
  const [certify, setCertify] = useState([]);
  const [icons, setIcons] = useState([]);
  const [infoSpeech, setInfoSpeech] = useState();
  const accessToken = useRecoilValue(getAccessTokenAtom);

  const decodedaccessToken = jwtDecode(accessToken);
  const memberId = decodedaccessToken.memberId;

  const addIconArray = () => {
    const newIcons = certify.map((item, index) => {
      if (item === "DRINK") return <Changing_icon_2 key={index} />;
      if (item === "SNACK") return <Changing_icon_1 key={index} />;
      return null;
    });
    setIcons(newIcons);
  };

  const handleExpandClick = async (index, productName) => {
    setExpandedIndex(expandedIndex === index ? null : index);

    try {
      const response = await axios.get(
        `https://www.drinkguide.store/api/v1/purchases/nutrient-info?productName=${encodeURIComponent(
          productName
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.data);
      setInfoSpeech(response.data.data);
    } catch (error) {
      console.error("영양 정보 조회 실패", error);
    }
  };

  useEffect(() => {
    addIconArray();
  }, [certify]);

  useEffect(() => {
    getSpeech(infoSpeech);
  }, [infoSpeech]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(
          "https://www.drinkguide.store/api/v1/purchases",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data);
        if (response.data.data.length > 0) {
          setHistoryData((prev) => [...prev, ...response.data.data]);
          console.log(historyData);
        }
      } catch (error) {
        console.error("실패함", error);
      }
    };
    fetchHistoryData();
  }, []); // 전체 구매 내역 조회

  useEffect(() => {
    const fetchPurchaseNumInfoData = async () => {
      try {
        const response = await axios.get(
          `https://www.drinkguide.store/api/v1/purchases/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCertify(response.data.data);
        setPurchaseNum(response.data.data.length);
        console.log(response.data.data.length);
      } catch (error) {
        console.error("실패함", error);
      }
    };
    fetchPurchaseNumInfoData();
  }, []); // 구매 인증 횟수 조회

  const getColorByProductType = (productType) => {
    const colorObj = productColor.find((color) => color[productType]);
    return colorObj ? colorObj[productType] : "#FFFFFF";
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
          {[...Array(10 - icons.length)].map((_, index) => (
            <Circle key={icons.length + index}></Circle>
          ))}
        </PurchaseImageContainer>
        <HistoryTextBox fontSize="16px" fontColor="#FFFA87" margin="0 0 40px 0">
          이번 달에는 구매 인증을 {purchaseNum}회 했어요.
          <br />
          {10 - purchaseNum}회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff" margin="0">
          구매한 상품 히스토리
        </HistoryTextBox>

        <PurchaseHistoryList>
          {historyData.length > 0 ? (
            historyData.map((item, index) => (
              <PurchaseItemContainer
                key={index}
                expanded={expandedIndex === index}
                color={getColorByProductType(item.productType)}
              >
                <PurchaseItemHeader
                  onClick={() => handleExpandClick(index, item.productName)}
                >
                  <span>{item.productName}</span>
                  <span>{item.purchaseDate} 구매</span>
                </PurchaseItemHeader>
                {/* <PurchaseItemDetails expanded={expandedIndex === index}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.details}</p>
                </PurchaseItemDetails> */}
              </PurchaseItemContainer>
            ))
          ) : (
            <HistoryTextBox fontSize="16px" fontColor="#ffffff">
              구매한 상품이 없습니다.
            </HistoryTextBox>
          )}
        </PurchaseHistoryList>
      </HistoryContainer>
      <Footer />
    </>
  );
};

export default HistoryPage;
