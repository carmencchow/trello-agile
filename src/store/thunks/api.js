import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

export const fetchLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}list`);
    console.log(response.data.lists, 'response.data.lists lists endpoint');
    return response.data.lists;
  } catch (error) {
    throw new Error('Failed to fetch lists');
  }
};

export const fetchBoards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}board`);
    console.log(response.data.boards, 'response.data.boards boards endpoint');
    return response.data.boards;
  } catch (error) {
    throw new Error('Failed to fetch board');
  }
};