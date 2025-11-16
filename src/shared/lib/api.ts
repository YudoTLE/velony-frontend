import axios, {
  AxiosHeaders,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

interface ErrorResponse {
  statusCode?: number;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

const redirectToSignIn = async () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/sign-in';
  } else {
    const { redirect } = await import('next/navigation');
    redirect('/auth/sign-in');
  }
};

let serverCookieCache: string | null = null;

api.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (typeof window === 'undefined') {
      if (serverCookieCache) {
        config.headers.set('Cookie', serverCookieCache);
      } else {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        config.headers.set('Cookie', cookieStore.toString());
      }
    }

    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type');
    } else if (config.data && !config.headers.get('Content-Type')) {
      config.headers.set('Content-Type', 'application/json');
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ErrorResponse>) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const data = err.response?.data;

    const isRefreshEndpoint = err.config?.url?.includes('/auth/refresh');

    if (
      data?.statusCode === 401 &&
      data?.message === 'Unauthorized' &&
      !originalRequest._retry
    ) {
      if (isRefreshEndpoint) {
        serverCookieCache = null;

        await redirectToSignIn();

        return Promise.reject(data);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((queueErr) => Promise.reject(queueErr));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await api.post('/auth/refresh');

        if (typeof window === 'undefined') {
          const setCookieHeader = refreshResponse.headers['set-cookie'];
          if (setCookieHeader) {
            serverCookieCache = Array.isArray(setCookieHeader)
              ? setCookieHeader.join('; ')
              : setCookieHeader;
          }
        }

        processQueue();
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;
        serverCookieCache = null;

        await redirectToSignIn();

        return Promise.reject(data);
      }
    }

    return Promise.reject(data);
  },
);

export default api;
