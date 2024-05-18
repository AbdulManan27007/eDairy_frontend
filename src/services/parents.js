import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(`${BASE_API_URL}/parent`, dataObj);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL = async () => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/parent`);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_SINGLE = async (dataObj) => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/parent/${dataObj}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (categoryId) => {
  try {
    const { data } = await privateApi.delete(
      `${BASE_API_URL}/parent/${categoryId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/parent/${dataObj.id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const LoginParent = async (dataObj) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/parent/login`, dataObj);
    return response.data; // You may return a success message or relevant data.
  } catch (error) {
    throw error;
  }
};

export const tutionTeacher = async (dataObj) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/parent/tutionTeacher/login`,
      dataObj
    );
    return response.data; // You may return a success message or relevant data.
  } catch (error) {
    throw error;
  }
};
