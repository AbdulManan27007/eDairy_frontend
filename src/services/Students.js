import { BASE_API_URL } from "../constants/constants";
import { privateApi } from "./agent";

export const CREATE_NEW = async (dataObj) => {
  try {
    const { data } = await privateApi.post(
      `${BASE_API_URL}/admin/student`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const GET_ALL_students = async (obj) => {
  let query = "";

  if (obj?.parent) {
    query += `parent=${obj.parent}&`;
  }

  if (obj?.section) {
    query += `section=${obj.section}&`;
  }

  // Remove trailing '&' if any
  query = query.replace(/&$/, "");

  try {
    const { data } = await privateApi.get(
      `${BASE_API_URL}/admin/student${query ? `?${query}` : ""}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const GET_SINGLE = async (dataObj) => {
  try {
    const { data } = await privateApi.get(
      `${BASE_API_URL}/admin/student/${dataObj._id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const DELETE_BY_ID = async (categoryId) => {
  try {
    const { data } = await privateApi.delete(
      `${BASE_API_URL}/admin/student/${categoryId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_BY_ID = async (dataObj) => {
  try {
    const { data } = await privateApi.patch(
      `${BASE_API_URL}/admin/student/${dataObj._id}`,
      dataObj
    );
    return data;
  } catch (error) {
    return error;
  }
};
