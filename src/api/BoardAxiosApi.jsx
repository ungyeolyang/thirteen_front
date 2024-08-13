import AxiosInstance from "./AxiosInstance";

const LOGO = "/board";
const BoardApi = {
  alluser: async (page) => {
    return await AxiosInstance.get(LOGO + `/alluser/${page}`);
  },
  boardSave: async (title, content, cate) => {
    const dto = {
      title: title,
      content: content,
      cate: cate,
    };
    return await AxiosInstance.post(LOGO + "/bsave", dto);
  },
  boardList: async (cate, page) => {
    return await AxiosInstance.get(LOGO + `/blist/${cate}/${page}`);
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
  commetDetail: async (bno) => {
    return await AxiosInstance.get(LOGO + `/bcomment/${bno}`);
  },
  commentSave: async (content, bno) => {
    const dto = {
      comment: content,
      board: {
        bno: bno,
      },
      // nick: nick,
    };
    return await AxiosInstance.post(LOGO + `/csave`, dto);
  },
  cUpdate: async (content, bno, cno) => {
    const dto = {
      comment: content,
      board: {
        bno: bno,
      },
      // member: { nick: nick },
      cno: cno,
    };
    return await AxiosInstance.post(LOGO + `/cupdate`, dto);
  },
};
export default BoardApi;
