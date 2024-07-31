import axios from "axios";
import Common from "../utils/Common";

const AxiosInstance = axios.create({});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Common.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (Common.getRefreshToken()) {
        const newToken = await Common.handleUnauthorized();
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${Common.getAccessToken()}`;
          return AxiosInstance.request(error.config);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
