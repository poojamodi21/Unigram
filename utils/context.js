import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [type, setType] = useState('')
  const [userName, setUserName] = useState('')

  let sharedState = {
    loggedIn,
    setLoggedIn,
    type,
    setType,
    userName,
    setUserName
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(){
  return useContext(AppContext);
}
