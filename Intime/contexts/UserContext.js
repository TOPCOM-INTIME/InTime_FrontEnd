import React, {useContext, createContext, useState} from 'react';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [edited, setEdited] = useState(true);
  return (
    <UserContext.Provider
      children={children}
      value={{user, setUser, edited, setEdited}}
    />
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return userContext;
}
