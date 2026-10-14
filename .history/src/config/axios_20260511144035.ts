import axios from "axios";
import { ENV } from "@/config/env";
import { useAuthStore } from "@/modules/auth/auth.store";

export const axiosInstance = axios.create({
  baseURL: ENV.API_URL
});

export const axiosAuth = axios.create({
  baseURL: ENV.API_URL
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Para controlar el refesh */
let isRefreshing = false;

let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {

  failedQueue.forEach((prom) => {

    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }

  });

  failedQueue = [];
};

axiosAuth.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Evitar loops infinitos
    if (originalRequest._retry) {
      useAuthStore.getState().logout();

      localStorage.removeItem("auth-storage");

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* Si ya se refresco */

    if (isRefreshing) {

      return new Promise((resolve, reject) => {

        failedQueue.push({
          resolve,
          reject,
        });

      }).then((token) => {

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axiosAuth(originalRequest);

      });

    }

    isRefreshing = true;

    try {

      const response = await axios.post(`${ENV.API_URL}/v1/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }
      );

      const data = response.data;

      /* Se actualiza el store */

      useAuthStore.getState().setAuth(
        data.token,
        data.user
      );

      processQueue(null, data.token);

      // Reintentar request original

      originalRequest.headers.Authorization =
        `Bearer ${data.token}`;

      return axiosAuth(originalRequest);

    } catch (refreshError) {

      processQueue(refreshError, null);

      useAuthStore.getState().logout();

      localStorage.removeItem("auth-storage");

      return Promise.reject(refreshError);

    } finally {

      isRefreshing = false;

    }
  }
);