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
  width: 214px;
  height: 57px;
  position: relative;
`;

const ButtonContentBox = styled.div`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  position: relative;
`;
export const Button = (props) => {
  const name = props.name;
  const color = props.color;
  return (
    <ButtonContainer color={color}>
      <ButtonContentBox color={color}>{name}</ButtonContentBox>
    </ButtonContainer>
  );
};
