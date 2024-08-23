import styled from "styled-components";

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? width : `70%`)};
  height: ${({ height }) => (height ? height : `50px`)};
  padding: 0 20px;
  input:focus {
    border: 3px solid rgb(113, 153, 255);
  }
  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 100%;
    padding: 8px 4px;
    font-weight: bold;
    background-color: ${({ background }) =>
      background ? background : `transparent`};
    border: 1px solid silver;
    border-radius: 10px;
    outline: none;
  }
  input::placeholder {
    font-size: 24px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  svg {
    position: absolute;
    font-size: 24px;
  }
  svg:nth-of-type(1) {
    left: 40px;
  }
  svg:nth-of-type(2) {
    right: 40px;
  }
  button {
    padding: 5px;
    position: absolute;
    right: 40px;
  }
`;
export default InputBox;
