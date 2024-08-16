import AxiosInstance from "./AxiosInstance";

const LOGO = "/my";
const MyAxiosApi = {
  authority: async () => {
    return await AxiosInstance.get(LOGO + "/authority");
  },
  detail: async () => {
    return await AxiosInstance.get(LOGO + "/detail");
  },
  //1:profile, 2:pw, 3:nick, 4:email, 5:pay
  editInfo: async (info, type) => {
    const member = {
      info: info,
      type: type,
    };
    return await AxiosInstance.post(LOGO + `/editinfo`, member);
  },
  checkPw: async (pwd) => {
    const member = {
      pwd: pwd,
    };
    return await AxiosInstance.post(LOGO + `/checkpw`, member);
  },
  withdraw: async () => {
    return await AxiosInstance.get(LOGO + "/withdraw");
  },
  Pay: async (payment) => {
    return await AxiosInstance.post(LOGO + "/pay", payment);
  },
};
export default MyAxiosApi;
