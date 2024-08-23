import styled from "styled-components";
import Button from "../../component/Button";

const SaveDiv = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  width: 90%;
  height: 8%;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInside = styled.div`
  width: 42%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.div`
  width: 38%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;
const TitleInput = styled.input`
  width: 62%;

  border: 0cap;
  font-size: 1rem;
  box-sizing: border-box;
  color: #000;
  position: relative;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ Value }) => (Value ? `#000` : `gray`)};
  }
`;

const ContentInput = styled.input`
  width: 100%;
  height: 74%;
  text-align: center;
  border: 0cap;
  font-size: 1rem;
  box-sizing: border-box;
  color: #000;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ Value }) => (Value ? `#000` : `gray`)};
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentDiv = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2%;
  border: 1px solid #000;
`;

const CommentInput = styled.input`
  /* background-color: #acaaaa; */
  border: 0cap;
  font-size: 1rem;
  box-sizing: border-box;
  color: #000;
  position: relative;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ Value }) => (Value ? `#000` : `gray`)};
  }
`;
const BoardComment = (props) => {
  const { buttonlist, board, comment, setComment, read } = props;

  const buttonMap = () => {
    return (
      <>
        {buttonlist &&
          buttonlist.map((btn, index) => (
            <Button key={index} onClick={btn.func}>
              {btn.text}
            </Button>
          ))}
      </>
    );
  };

  return (
    <>
      <SaveDiv>
        <TitleDiv>
          <TitleInside>
            <TitleP>제목 : </TitleP>
            <TitleInput
              type="text"
              value={board ? board.title : "제목입력"}
              // Value={props.value}
              // readOnly={read ? true : false}
              readOnly={true}
            />
          </TitleInside>
          <TitleInside>
            <TitleP>글쓴이 : </TitleP>
            <TitleInput type="text" value={"닉네임"} readOnly={true} />
          </TitleInside>
        </TitleDiv>
        <ContentInput
          type="content"
          value={board ? board.content : "내용입력"}
          // readOnly={read ? true : false}
          readOnly={true}
        />
      </SaveDiv>
      <CommentDiv>
        <CommentInput
          placeholder={comment ? comment : "에러"}
          onChange={(e) => setComment(e.target.value)}
        />
      </CommentDiv>
      <ButtonDiv>{buttonMap()}</ButtonDiv>
    </>
  );
};
export default BoardComment;
