import React, { createContext, useState } from 'react';

export const NotifProvider = createContext({});

export const NotifContext = ({ children }) => {
const [allNotifs, setAllNotifs] = useState([]);

return (
  <NotifProvider.Provider
    value={{ allNotifs, setAllNotifs }}
  >
    {children}
  </NotifProvider.Provider>
);
};
