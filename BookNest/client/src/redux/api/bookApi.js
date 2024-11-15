// src/utils/stockApi.js
import axios from 'axios';

// Create an Axios instance
const BASE_URL = "http://localhost:5000/api/v1/book/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Function to get the token
const getToken = () => {
  return localStorage.getItem("token");
};

// // API Functions
// export const createBook = async (bookData) => {
//   try {
//     const response = await axiosInstance.post("books", bookData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating book:", error);
//     throw error;
//   }
// };
export const createBook = async (bookData) => {
  try {
    console.log("Creating book with data:", bookData);
    const response = await axiosInstance.post("books", bookData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error creating book:", errorMessage);
    throw error;
  }
};


// export const getBooks = async (sortBy) => {
//   const token = getToken();
//   try {
//     const response = await axiosInstance.get(`books?sortBy=${sortBy}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     throw error;
//   }
// };

export const getBooks = async () => {
  const token = getToken();
  try {
    const response = await axiosInstance.get('books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const updateBook = async (bookId, bookData) => {
  // const token = getToken();
  try {
    const response = await axiosInstance.put(`books/${bookId}`, bookData, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  const token = getToken();
  try {
    const response = await axiosInstance.delete(`books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting book :", error);
    throw error;
  }
};
