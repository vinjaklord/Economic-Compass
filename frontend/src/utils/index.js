import axios from 'axios';

const fetchAPI = (options = {}) => {
  const defaultConfig = {
    method: 'get',
    timeout: 5000,
    data: {},
    url: '/',

    baseURL: 'https://economic-compass-q85w.vercel.app',
  };

  const axiosConfig = {
    ...defaultConfig,
    ...options,
  };

  return axios(axiosConfig);
};

export { fetchAPI };
