import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

// export const fetchLists = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}list`);
//     console.log(response.data.lists, 'response.data.lists lists endpoint');
//     return response.data.lists;
//   } catch (error) {
//     throw new Error('Failed to fetch lists');
//   }
// };

export const fetchLists = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}list/${id || ""}`);
    console.log(response.data.lists, 'response.data.lists lists endpoint');
    return response.data.lists.slice(0, 4); // returns only the first 4 items
  } catch (error) {
    throw new Error('Failed to fetch lists');
  }
};

export const fetchBoards = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(`${BASE_URL}board/${id || ""}`);
    console.log(response.data.boards, 'response.data.boards boards endpoint');
    return response.data.boards;
  } catch (error) {
    throw new Error('Failed to fetch board');
  }
};

// export const fetchCards = async (id) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("No token found in localStorage");
//   }
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   try {
//     const response = await axios.get(`${BASE_URL}cards/${id || ""}`);
//     console.log(response.data.cards, 'response.data.cards check');
//     return response.data.cards;
//   } catch (error) {
//     throw new Error('Failed to fetch board');
//   }
// };