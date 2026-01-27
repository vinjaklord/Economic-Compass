import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://economic-compass-q85w.vercel.app',
  timeout: 5000,
});

const fetchAPI = (options = {}) => {
  const { token, ...axiosOptions } = options;

  // Add Authorization header if token exists
  if (token) {
    axiosOptions.headers = {
      ...axiosOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  console.log(
    '🔍 Making request to:',
    axiosInstance.defaults.baseURL + (axiosOptions.url || '/'),
  );

  return axiosInstance(axiosOptions);
};

export { fetchAPI };
