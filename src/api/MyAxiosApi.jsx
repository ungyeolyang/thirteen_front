import AxiosInstance from "./AxiosInstance";

const LOGO = "/my";
const MyAxiosApi = {
  authority: async () => {
    return await AxiosInstance.get(LOGO + "/authority");
  },
  detail: async () => {
    return await AxiosInstance.get(LOGO + "/detail");
  },
};
export default MyAxiosApi;
