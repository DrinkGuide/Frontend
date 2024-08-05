import styled from "styled-components";

const ButtonContainer = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border-style: solid;
  border-color: ${(props) => props.color};
  font-weight : ${(props) => props.fontWeight};
  border-width: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  row-gap: 0px;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  //214,57
  height: ${(props) => props.height};
  position: relative;
  margin-bottom: ${(props) => props.marginBottom};
  padding-top : ${(props) => props.paddingTop};

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.color};

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
  font-size: 24px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const Button = (props) => {
  const { name, color, onClick , width, height, marginBottom, fontWeight, paddingTop} = props;

  return (
    <ButtonContainer color={color} width={width} height={height} marginBottom= {marginBottom} paddingTop={paddingTop} fontWeight= {fontWeight} onClick={onClick}>
      <ButtonContentBox color={color}>{name}</ButtonContentBox>
    </ButtonContainer>
  );
};
