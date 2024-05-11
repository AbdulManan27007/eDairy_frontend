import axios from "axios";
import { BASE_API_URL } from "../constants/constants";

export const privateApi = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: "",
  },
});

privateApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        console.log("token expired");
      } catch (storageError) {
        // Handle AsyncStorage error, if needed
        console.error("AsyncStorage error:", storageError);
      }
    }
    return Promise.reject(error);
  }
);

privateApi.interceptors.request.use(async (request) => {
  const accessToken = await localStorage.getItem("access_token");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

export const publicApi = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
