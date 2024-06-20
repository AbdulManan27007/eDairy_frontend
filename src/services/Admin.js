import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const LoginAdmin = async (dataObj) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/admin/login`, dataObj);
    return response.data; // You may return a success message or relevant data.
  } catch (error) {
    throw error;
  }
};

export const UploadImage = async (fileData) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/admin/uploadImage`,
      fileData
    );
    return response.data; // You may return a success message or relevant data.
  } catch (error) {
    throw error;
  }
};

export const UPDATE_BY_ID_Admin = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/admin/update/${dataObj.id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
