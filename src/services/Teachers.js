import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(`${BASE_API_URL}/teacher`, dataObj);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL_Teachers = async () => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/teacher`);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_SINGLE_Teacher = async (id) => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/teacher/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (id) => {
  try {
    const { data } = await privateApi.delete(`${BASE_API_URL}/teacher/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/teacher/${dataObj._id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const LoginTeacher = async (dataObj) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/teacher/login`, dataObj);
    return response.data; // You may return a success message or relevant data.
  } catch (error) {
    throw error;
  }
};
