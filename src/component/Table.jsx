import styled from "styled-components";

const StyledTable = styled.div`
  width: ${({ width }) => (width ? width : `90%`)};
  height: ${({ height }) => (height ? height : `90%`)};
  background-color: ${({ color }) => (color ? color : `gray`)};
  border-radius: ${({ border }) => (border ? `10px` : `none`)};
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;

  head {
    display: flex;
    width: 100%;
    height: 10%;
    background-color: #4aa1e7;
    color: #fff;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: sticky; /* 스크롤 시 상단에 고정 */
    top: 0; /* 상단 위치 고정 */
    border-radius: ${({ border }) => (border ? `10px 10px 0 0` : `none`)};
  }

  div {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  table {
    width: 80%;
    height: 80%;
    background-color: #fff;
  }

  tr {
    &:nth-child(even) {
      background: #f9f9f9;
    }

    &:hover {
      background: #f1f1f1;
    }
  }

  td {
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 1rem;
  }
`;

const Table = (props) => {
  const { header, list } = props;
  return (
    <StyledTable
      width={props.width}
      height={props.height}
      color={props.color}
      border={props.border}
    >
      <head>{header}</head>
      <div>
        <table>
          <tbody>{list}</tbody>
        </table>
      </div>
    </StyledTable>
  );
};
export default Table;
