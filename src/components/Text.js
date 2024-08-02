import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
color: ${(props) => props.color};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  font-size: ${(props) => props.fontSize};
  font-family :  ${(props) => props.font};
  font-weight: ${(props) => props.fontWeight || "normal"};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  position: flex;
`;

export const Text = (props) => {
  const { marginTop, marginBottom, paddingTop, paddingBottom, color, fontSize, fontWeight, children } = props;

  return (
    <TextContainer
    marginBottom={marginBottom}
    marginTop={marginTop}
      color={color}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </TextContainer>
  );
};
