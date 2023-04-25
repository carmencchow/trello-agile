import React, { createContext, useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/user/me");
      setUserInfo(res.data);
      console.log(
        "Displaying user boards:", userInfo,
        res.data.boards.map((board) => {
          return board._id;
        })
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
    console.log(id);
  };

  return (
    <UserContext.Provider value={{    
    }}>
      {children}
    </UserContext.Provider>
  )
}

