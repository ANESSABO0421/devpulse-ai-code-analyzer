import axios from "axios";

const baseConfig = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
};

/**
 * 🔹 Public instance (NO TOKEN)
 */
export const axiosInstance = axios.create(baseConfig);

export const axiosTokenInstance = axios.create(baseConfig);

axiosTokenInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const handleResponseError = (error: any) => {
  if (error.response?.status === 401) {
    console.log("Unauthorized - token may be expired");

    // optional:
    // localStorage.removeItem("token");
    // window.location.href = "/login";
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (res) => res,
  handleResponseError
);

axiosTokenInstance.interceptors.response.use(
  (res) => res,
  handleResponseError
);