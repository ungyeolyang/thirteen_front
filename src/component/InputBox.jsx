import styled from "styled-components";

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  height: 50px;
  padding: 0 20px;
  border: 1px solid black;
  border-radius: 10px;

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 90%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
  }
  input::placeholder {
    font-size: 24px;
  }
  svg {
    font-size: 24px;
  }
`;
export default InputBox;
