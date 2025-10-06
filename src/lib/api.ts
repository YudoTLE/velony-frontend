import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res.data.data ?? res.data,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error?.msg ||
      err.response?.data?.error ||
      err.message ||
      'Network Error';
    return Promise.reject({
      message,
      status: err.response?.status,
      data: err.response?.data,
    });
  },
);

export default api;
