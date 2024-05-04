import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(`${BASE_API_URL}/edairy`, dataObj);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL = async (subject) => {
  try {
    const { data } = subject
      ? await privateApi.get(`${BASE_API_URL}/edairy/?section=${subject}`)
      : await privateApi.get(`${BASE_API_URL}/edairy`);
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_SINGLE = async (id) => {
  try {
    const { data } = await privateApi.get(`${BASE_API_URL}/edairy/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (id) => {
  try {
    const { data } = await privateApi.delete(`${BASE_API_URL}/edairy/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/edairy/${dataObj.id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
