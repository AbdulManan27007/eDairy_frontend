import axios from "axios";
import { BASE_API_URL } from "../constants/constants";

export const getAllCategory = (pgnmbr) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const perPage = 10; // Set your desired perPage value
      const pageNo = pgnmbr;

      var config = {
        method: "get",
        url: `${BASE_API_URL}/categories/?perPage=${perPage}&pageNo=${pageNo}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          //console.log("Sign Up response Error:", error);
          reject(error);
        });
    } catch (error) {
      //console.log(`Exception - Service - Signup ${error}`);
      reject(error);
    }
  });
};

export const addCategory = (categoryData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      var config = {
        method: "post",
        url: `${BASE_API_URL}/categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: categoryData, // Pass the category data as the request body
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      var config = {
        method: "delete",
        url: `${BASE_API_URL}/categories/${categoryId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("Delete response:", response);
          resolve(response.data);
        })
        .catch(function (error) {
          console.error("Delete error:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Exception:", error);
      reject(error);
    }
  });
};

export const updateCategory = (categoriesId, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      var config = {
        method: "put", // Use "patch" for partial updates or "put" for full updates
        url: `${BASE_API_URL}/categories/${categoriesId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: body,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// export const updateCategorey = (categoriesId, body) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const accessToken = localStorage.getItem("access_token");

//       var config = {
//         method: "patch",
//         url: `${BASE_API_URL}/categories/${categoriesId}`,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         data: body,
//       };

//       axios(config)
//         .then(function (response) {
//           resolve(response.data);
//         })
//         .catch(function (error) {
//           reject(error);
//         });
//     } catch (error) {
//       //console.log(`Exception - Service - GetLoggedUser ${error}`);
//       reject(error);
//     }
//   });
// };

// export const deleteCategorey = async (videoId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const accessToken = localStorage.getItem("access_token");

//       var config = {
//         method: "delete",
//         url: `${BASE_API_URL}/categories/${videoId}`,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       };
//       axios(config)
//         .then(function (response) {
//           resolve(response.data);
//         })
//         .catch(function (error) {
//           reject(error);
//         });
//     } catch (error) {
//       //console.log(`Exception - Service - GetLoggedUser ${error}`);
//       reject(error);
//     }
//   });
// };
