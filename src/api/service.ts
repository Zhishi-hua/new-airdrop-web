import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// 封装 GET 请求
export const get = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return api.get<T>(url, config) as Promise<T>;
};

// 封装 POST 请求
export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return api.post<T>(url, data, config) as Promise<T>;
};

export default api;
