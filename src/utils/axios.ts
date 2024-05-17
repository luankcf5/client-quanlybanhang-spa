import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Đã có lỗi xảy ra !')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/users/me',
    password: '/users/password',
    login: '/auth/login',
    register: '/auth/register',
    refreshToken: 'auth/refresh-token',
  },
  user: {
    root: '/users',
  },
  permission: {
    root: '/permissions',
  },
  role: {
    root: '/roles',
  },
  category: {
    root: '/categories',
  },
  product: {
    root: '/products',
  },
  voucher: {
    root: '/vouchers',
  },
  customer: {
    root: '/customers',
  },
  room: {
    root: '/rooms',
  },
  bill: {
    root: '/bills',
  },
  student: {
    root: '/students',
  },
  class: {
    root: '/classes',
  },
  question: {
    root: '/questions',
  },
  exam: {
    root: '/exams',
  },
  submission: {
    root: '/submissions',
  },

  store: {
    root: '/stores',
  },
};
