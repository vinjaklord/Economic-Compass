// Imports
import axios from "axios";

// Konstanten

const fetchAPI = (options = {}) => {
  const defaultConfig = {
    method: "get",
    timeout: 5000,
    data: {},
    url: "/",
    baseURL: "http://localhost:3000/",
    // validateStatus: (status) => {
    //   return status >= 200 && status < 500; // alles in diesem HTTP Status Bereich ist für Axios kein Fehler!
    // },
  };

  // const headers = options.token
  //   ? {
  //       Authorization: "Bearer " + options.token,
  //     }
  //   : {};

  // Authorization bilden, wenn es einen Token gibt

  const axiosConfig = {
    ...defaultConfig,
    ...options,
  };

  return axios(axiosConfig);
};

export { fetchAPI };
