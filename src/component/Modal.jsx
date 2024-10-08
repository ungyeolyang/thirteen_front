import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;

    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      color: white;
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #46a1cc;
      font-weight: 700;
      button {
        position: absolute;
        top: 9px;
        right: 15px;
        width: 30px;
        font-size: 23px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: black;
        }
      }
    }
    main {
      padding: 16px;
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : `#6c757d`};
  &:hover {
    background-color: ${({ hover }) => (hover ? hover : `#8c98a3`)};
  }
`;

const Modal = (props) => {
  const { open, confirm, close, type, header, children, yes, no } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              {/* <button onClick={close}>&times;</button> */}
            </header>
            <main>{children}</main>
            <footer>
              {type && (
                <Button
                  onClick={confirm}
                  backgroundColor={`#c80000`}
                  hover={`RGB(193, 78, 78)`}
                >
                  {yes ? yes : `확인`}
                </Button>
              )}
              <Button onClick={close}>{no ? no : `취소`}</Button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Modal;
