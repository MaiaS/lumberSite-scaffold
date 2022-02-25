import styled from "@emotion/styled";

/* takes a `scroll` number **/
export const Progress = styled.div`
  width: 100%;
  position: relative;

  background: linear-gradient(
    to right,
    rgba(000, 000, 000, 1) ${(props) => props.scroll}%,
    rgba(0, 0, 0, 0.2) ${(props) => props.scroll}%
  );
  height: 1px;
  margin: 40px;
`;
