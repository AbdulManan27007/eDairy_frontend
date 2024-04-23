import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(
      `${BASE_API_URL}/admin/class`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL_classes = async () => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/admin/class`);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_SINGLE_CLASS = async (id) => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/admin/class/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (id) => {
  try {
    const { data } = await privateApi.delete(
      `${BASE_API_URL}/admin/class/${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/admin/class/${dataObj.id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
