import styled from "styled-components";

const ButtonContainer = styled.div`
  padding: 7.9375rem;
  padding-bottom: 0;
`;
export const ScrollButton = () => {
  return (
    <ButtonContainer>
      <svg
        width="59"
        height="17"
        viewBox="0 0 59 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L29.5 14L57 2"
          stroke="#FFFA87"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </ButtonContainer>
  );
};