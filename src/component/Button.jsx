import styled from "styled-components";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? width : `65%`)};
  height: ${({ height }) => (height ? height : `50px`)};
  color: white;
  font-size: 23px;
  font-weight: bold;
  overflow: hidden;
  border-radius: 10px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: pointer;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : `#c80000`};
  &:hover {
    background-color: ${({ hover }) => (hover ? hover : `RGB(193, 78, 78)`)};
  }
`;
export default Button;
