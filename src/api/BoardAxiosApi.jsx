import AxiosInstance from "./AxiosInstance";

const LOGO = "/board";
const BoardApi = {
  alluser: async () => {
    return await AxiosInstance.get(LOGO + "/alluser");
  },
};
export default BoardApi;
