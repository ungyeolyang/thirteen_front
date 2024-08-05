import axios from "axios";

const Common = {
  DOMAIN: "http://localhost:8111", // Controller 주소

  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },

  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  handleUnauthorized: async () => {
    const refreshToken = Common.getRefreshToken(); // refreshToken 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${Common.DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log(res.data);
      Common.setAccessToken(res.data.accessToken);
      Common.setExpiresIn(res.data.accessTokenExpiresIn);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  onKeyDownEnter: (e, func) => {
    if (e.key === "Enter") {
      func();
    }
  },

  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },

  jasonFormatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    const milliseconds = ("00" + date.getMilliseconds()).slice(-3);

    // ISO 형식인 "yyyy-MM-dd'T'HH:mm:ss.SSSX"으로 문자열을 반환합니다
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${milliseconds}Z`;
  },
  formatDetailDate: (dateString) => {
    const date = new Date(dateString);
    let hour = date.getHours();
    const minute = ("0" + date.getMinutes()).slice(-2);
    const ampm = hour < 12 ? "오전" : "오후";

    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return ` ${ampm} ${hour}:${minute}`;
  },
  rpad: (str, length, padString) => {
    while (str.length < length) {
      str += padString;
    }
    return str;
  },
  // Fisher-Yates shuffle algorithm to randomize
  shuffleArray: (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  },
};
export default Common;
