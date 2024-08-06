import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
color: ${(props) => props.color};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  font-size: ${(props) => props.fontSize};
  font-family :  ${(props) => props.font};
  font-weight: ${(props) => props.fontWeight || "normal"};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  background-color : ${(props) => props.backgroundColor};
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  position: flex;
`;

export const Text = (props) => {
  const { marginTop, marginBottom, paddingTop, paddingBottom,paddingLeft, paddingRight, color, fontSize, fontWeight, children, font , backgroundColor} = props;

  return (
    <TextContainer
      marginBottom={marginBottom}
      marginTop={marginTop}
      color={color}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      fontSize={fontSize}
      fontWeight={fontWeight}
      font={font}
      backgroundColor = {backgroundColor}
    >
      {children}
    </TextContainer>
  );
};
