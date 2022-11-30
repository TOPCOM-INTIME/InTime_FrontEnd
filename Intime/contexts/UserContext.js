import React, {useContext, createContext, useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {API_URL} from '@env';
import authStorage from '../stroages/authStorage';
import axios from 'axios';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await authStorage.get();
        setUser(data);
        const deviceToken = await messaging().getToken();
        await axios.put(
          `${API_URL}/api/device-token`,
          {deviceToken},
          {headers: {Authorization: data}},
        );
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, [setUser]);
  return <UserContext.Provider children={children} value={{user, setUser}} />;
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return userContext;
}
