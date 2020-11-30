import React, { createContext, useState } from 'react';

export const NotifProvider = createContext({});

export const notifContext = ({ children }) => {
  const [allNotifs, setAllNotifs] = useState([]);

  return (
    <AuthContext.Provider
      value={{ allNotifs, setAllNotifs }}
    >
      {children}
    </AuthContext.Provider>
  );
};
