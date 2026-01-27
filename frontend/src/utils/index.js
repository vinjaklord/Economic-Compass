import axios from 'axios';

// Force production URL - ignore any environment variables
const API_URL = 'https://economic-compass-q85w.vercel.app';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const fetchAPI = (options = {}) => {
  const { token, ...axiosOptions } = options;

  if (token) {
    axiosOptions.headers = {
      ...axiosOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  console.log('🔍 Using baseURL:', axiosInstance.defaults.baseURL);
  console.log(
    '🔍 Full request:',
    axiosInstance.defaults.baseURL + (axiosOptions.url || '/'),
  );

  return axiosInstance(axiosOptions);
};

export { fetchAPI };
