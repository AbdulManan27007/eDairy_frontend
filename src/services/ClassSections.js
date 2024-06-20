import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(
      `${BASE_API_URL}/admin/sections`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL_section = async () => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/admin/sections`);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_SINGLE_Section = async (id) => {
  try {
    const { data } = await privateApi.get(
      `${BASE_API_URL}/admin/sections/${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (id) => {
  try {
    const { data } = await privateApi.delete(
      `${BASE_API_URL}/admin/sections/${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/admin/sections/${dataObj.id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
