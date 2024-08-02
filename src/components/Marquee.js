import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as MarqueeSvg } from "../assets/images/marquee.svg";

const slideRight = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MarqueeContainer = styled.div`
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  width: 100%;
  overflow: hidden; /* Ensure the overflow is hidden */
  background-color: black; /* Adjust the background color if necessary */
`;

const MarqueeContent = styled.div`
  display: flex;
  width: 200%; /* Twice the width to hold two SVGs side by side */
  animation: ${slideRight} 10s linear infinite; /* Slide the content */
`;

const MarqueeItem = styled.div`
  flex: 1;
`;

export const Marquee = (props) => {
  const { paddingTop, paddingBottom } = props;
  return (
    <MarqueeContainer paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <MarqueeContent>
        <MarqueeItem>
          <MarqueeSvg />
        </MarqueeItem>
        <MarqueeItem>
          <MarqueeSvg />
        </MarqueeItem>
        <MarqueeItem>
          <MarqueeSvg />
        </MarqueeItem>
        <MarqueeItem>
          <MarqueeSvg />
        </MarqueeItem>
      </MarqueeContent>
    </MarqueeContainer>
  );
};
