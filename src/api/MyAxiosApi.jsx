import AxiosInstance from "./AxiosInstance";

const LOGO = "/my";
const MyAxiosApi = {
  //로그인 정보가 있으면 true
  authority: async () => {
    return await AxiosInstance.get(LOGO + "/authority");
  },
};
export default MyAxiosApi;
