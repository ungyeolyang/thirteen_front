import axios from "axios";
import Common from "../utils/Common";

const LOGO = "/auth";
const AuthAxiosApi = {
  //로그인 정보가 있으면 true
  login: async (mid, pwd) => {
    const login = {
      mid: mid,
      pwd: pwd,
    };
    return await axios.post(LOGO + "/login", login);
  },

  kakao: async (token) => {
    return await axios.get(LOGO + `/kakao?token=${token}`);
  },

  //정보가 있으면 true, 1:id, 2:email, 3:nick, 4:pw
  existInfo: async (info, type) => {
    const member = {
      info: info,
      type: type,
    };
    return await axios.post(LOGO + `/existinfo`, member);
  },

  //아이디/비밀번호 찾기
  findInfo: async (email) => {
    return await axios.get(LOGO + `/findinfo?email=${email}`);
  },

  //비밀번호 재설정
  resetPw: async (mid, pwd) => {
    const member = {
      mid: mid,
      pwd: pwd,
    };
    return await axios.post(LOGO + `/resetpw`, member);
  },

  //인증번호 받기
  certEmail: async (email) => {
    return await axios.get(LOGO + `/certemail?email=${email}`);
  },
  //가입되면 true
  signup: async (email, mid, pwd, nick) => {
    const member = {
      email: email,
      mid: mid,
      pwd: pwd,
      nick: nick,
    };
    return await axios.post(LOGO + `/signup`, member);
  },
  adPublished: async (url, link, expiration) => {
    const member = {
      aimage: url,
      alink: link,
      adate: expiration,
    };
    return await axios.post(LOGO + `/adpublished`, member);
  },
  adList: async (now) => {
    return await axios.get(LOGO + `/adlist?now=${now}`);
  },
};
export default AuthAxiosApi;
