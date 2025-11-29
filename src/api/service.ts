import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// 定义响应数据的类型
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api", // 从环境变量读取 API 基础地址
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 可以在这里添加其他请求头
    // if (config.headers) {
    //   config.headers['X-Custom-Header'] = 'custom-value';
    // }

    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.error("请求错误:", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;

    // 根据业务需求自定义状态码处理
    // 这里假设 code === 200 表示成功
    if (res.code !== 200) {
      // 处理业务错误
      console.error("业务错误:", res.message || "请求失败");

      // 可以根据不同的错误码做不同处理
      if (res.code === 401) {
        // 未授权，清除 token 并跳转到登录页
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        // window.location.href = '/login';
      }

      return Promise.reject(new Error(res.message || "请求失败"));
    }

    // 返回完整的响应对象，但修改 data 为业务数据
    response.data = res;
    return response;
  },
  (error: AxiosError) => {
    // 对响应错误做些什么
    console.error("响应错误:", error);

    // 处理 HTTP 状态码错误
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("请求参数错误");
          break;
        case 401:
          console.error("未授权，请重新登录");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          // window.location.href = '/login';
          break;
        case 403:
          console.error("拒绝访问");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器内部错误");
          break;
        case 502:
          console.error("网关错误");
          break;
        case 503:
          console.error("服务不可用");
          break;
        case 504:
          console.error("网关超时");
          break;
        default:
          console.error(`连接错误 ${status}`);
      }

      // 如果响应中有错误信息，使用响应中的信息
      const errorMessage =
        (data as { message?: string })?.message || `请求失败: ${status}`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("网络错误，请检查网络连接");
      return Promise.reject(new Error("网络错误，请检查网络连接"));
    } else {
      // 在设置请求时发生了一些事情，触发了一个错误
      console.error("请求配置错误:", error.message);
      return Promise.reject(error);
    }
  },
);

// 封装请求方法
export const request = {
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return service.get<ApiResponse<T>>(url, config).then((res) => res.data);
  },

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return service
      .post<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  },
};

// 导出 axios 实例，以便需要时直接使用
export default service;
