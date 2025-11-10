import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (config.data && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const data = err.response?.data;
    const messages = Array.isArray(data?.message)
      ? data?.message
      : [data?.message];
    const status = err.response?.status;

    return Promise.reject({
      data,
      messages,
      status,
    });
  },
);

export default api;
