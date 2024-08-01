import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
color: ${(props) => props.color};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  font-size: ${(props) => props.fontSize};
  font-family :  ${(props) => props.font};
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  position: flex;
`;

export const Text = (props) => {
  const { paddingTop, paddingBottom, color, fontSize, children } = props;

  return (
    <TextContainer
      color={color}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      fontSize={fontSize}
    >
      {children}
    </TextContainer>
  );
};
