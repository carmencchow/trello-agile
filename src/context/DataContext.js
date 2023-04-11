import React, { createContext, useState, useEffect } from 'react'
import { fetchData } from "../store/thunks/fetchList";
import { useDispatch } from "react-redux";
import axios from 'axios'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [comment, setComment] = useState('')
  const [cardId, setCardId] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [archiveBtn, setArchiveBtn] = useState(true);
  const dispatch = useDispatch();

  const handleCardSaved = (e) => {
    setInput("");
    handleFetchData();
  };

  const clearComment = () => {
    setComment('');
  };

  const getCard = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/card/${id}`);
      setCardData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFetchData = () => {
    dispatch(fetchData({ id : boardId }));
  };

  useEffect(() => {
    if(cardId){
    getCard(cardId);
    }
  }, [cardId]);
  
  return (
    <DataContext.Provider value={{    
      input, setInput,
      cardId, setCardId,
      name, setName,
      cardData, setCardData,
      getCard,
      handleFetchData,
      handleCardSaved,
      clearComment,
      comment, setComment, 
      archiveBtn, setArchiveBtn,
      boardId, setBoardId
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext