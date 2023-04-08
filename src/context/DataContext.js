import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [openInput, setOpenInput] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [cardData, setCardData] = useState(null);
  const [comment, setComment] = useState('')
  const [color, setColor] = useState('');
  const [archiveBtn, setArchiveBtn] = useState(true);

  const getCard = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`);
    setCardData(res.data);
  };

  useEffect(() => {
    getCard(cardId);
  }, [cardId]);
  
  return (
    <DataContext.Provider value={{    
      input, setInput,
      openInput, setOpenInput,
      cardId, setCardId,
      name, setName,
      cardData, setCardData,
      getCard,
      comment, setComment, 
      color, setColor, 
      archiveBtn, setArchiveBtn,
    }}>
      {children}
    </DataContext.Provider>
  )
}


export default DataContext