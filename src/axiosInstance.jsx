import axios from "axios";
import { getToken } from "./utils/authUtils";
import { backend_url } from "./utils/API";

const axiosInstance = axios.create({
  baseURL: backend_url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
