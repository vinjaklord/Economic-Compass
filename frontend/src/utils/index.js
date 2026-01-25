import axios from 'axios';

const fetchAPI = (options = {}) => {
  const defaultConfig = {
    method: 'get',
    timeout: 5000,
    data: {},
    url: '/',
    // Added VITE_ prefix here
    baseURL: import.meta.env.VITE_BACKEND_BASEURL,
  };

  const axiosConfig = {
    ...defaultConfig,
    ...options,
  };

  return axios(axiosConfig);
};

export { fetchAPI };
