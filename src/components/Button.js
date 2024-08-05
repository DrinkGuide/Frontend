import styled from "styled-components";

const ButtonContainer = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border-style: solid;
  border-color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  border-width: 2px;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  padding-left : ${(props) => props.paddingLeft};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.color};
    cursor: pointer;

    & > button {
      color: #000000;
    }
  }
`;

const ButtonContentBox = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.color};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  height: 100%; /* 부모의 높이를 차지하도록 설정 */
  width: 100%; /* 부모의 너비를 차지하도록 설정 */
`;

export const Button = (props) => {
  const { name, color, onClick , width, height,marginLeft, marginBottom, fontWeight, marginTop, fontSize, paddingLeft} = props;

  return (
    <ButtonContainer color={color} width={width} height={height} marginBottom= {marginBottom} marginTop={marginTop} fontWeight= {fontWeight} marginLeft={marginLeft} paddingLeft={paddingLeft} onClick={onClick}>
      <ButtonContentBox color={color} fontSize={fontSize}>{name}</ButtonContentBox>
    </ButtonContainer>
  );
};
