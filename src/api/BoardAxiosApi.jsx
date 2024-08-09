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
  boardUpdate: async (bno, title, content) => {
    const dto = {
      title: title,
      content: content,
      bno: bno,
    };
    return await AxiosInstance.post(LOGO + "/bupdate", dto);
  },
  boardDelete: async (bno) => {
    return await AxiosInstance.post(LOGO + `/bdelete/${bno}`);
  },
  comeBackUser: async (mid, tf) => {
    return await AxiosInstance.post(LOGO + `/userback/${mid}/${tf}`);
  },
  getBoardDetail: async (bno) => {
    return await AxiosInstance.get(LOGO + `/bdetail/${bno}`);
  },
};
export default BoardApi;
