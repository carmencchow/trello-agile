import React, { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('');
  const [deleted, setDeleted] = useState('Card deleted');

  return (
    <AppContext.Provider value={{     
      color, 
      setColor,
      status,
      setStatus, 
      deleted,
      setDeleted,
    }}>
      {children}
    </AppContext.Provider>
  )
}