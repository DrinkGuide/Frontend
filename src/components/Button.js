import styled from "styled-components";

const ButtonContainer = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-width: 2px;
  padding: 10px 40px 10px 40px;
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
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const Button = (props) => {
  const { name, color, onClick , width, height, marginBottom} = props;

  return (
    <ButtonContainer color={color} width={width} height={height} marginBottom= {marginBottom} onClick={onClick}>
      <ButtonContentBox color={color}>{name}</ButtonContentBox>
    </ButtonContainer>
  );
};
