import styled from "styled-components";
import BASICK from "../image/카톡 기본프로필 사진(연회색ver).jpg";

const StyledProfile = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: white;
  border: ${(props) => (props.border ? props.border : `none`)};
  display: ${({ display }) => (display ? `none` : `flex`)};
  position: relative;
  overflow: hidden;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
  }
`;

const Profile = (props) => {
  return (
    <StyledProfile
      size={props.size}
      onClick={props.onClick}
      display={props.display}
      border={props.border}
    >
      <img src={props.src || BASICK} alt="프로필" />
      {props.children}
    </StyledProfile>
  );
};

export default Profile;
