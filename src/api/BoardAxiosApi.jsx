import AxiosInstance from "./AxiosInstance";

const LOGO = "/board";
const BoardApi = {
  alluser: async () => {
    return await AxiosInstance.get(LOGO + "/alluser");
  },
  boardSave: async (title, content, cate) => {
    const dto = {
      title: title,
      content: content,
      cate: cate,
    };
    return await AxiosInstance.post(LOGO + "/bsave", dto);
  },
  boardList: async (cate) => {
    return await AxiosInstance.get(LOGO + `/blist/${cate}`);
  },
};
export default BoardApi;
