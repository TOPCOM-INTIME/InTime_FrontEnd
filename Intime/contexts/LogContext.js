import React, {useContext, createContext, useState, useEffect} from 'react';
import {useUserContext} from './UserContext';
import axios from 'axios';
import {API_URL} from '@env';

const LogContext = createContext(null);

export function LogContextProvider({children}) {
  const [patterns, setPatterns] = useState([]);
  const [patternGroups, setPatternGroups] = useState([]);
  const {user} = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPattern = await axios.get(
          `${API_URL}/api/readypatterns/origin`,
          {
            headers: {Authorization: user},
          },
        );
        setPatterns(fetchedPattern.data);
        const fetchedGroup = await axios.get(
          `${API_URL}/api/groups-with-patterns/all`,
          {
            headers: {Authorization: user},
          },
        );
        setPatternGroups(fetchedGroup.data);
      } catch (err) {
        console.error('로그 컨텍스트 에러', err);
        setPatternGroups([]);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <LogContext.Provider
      children={children}
      value={{patterns, setPatterns, patternGroups, setPatternGroups}}
    />
  );
}

export function useLogContext() {
  const logContext = useContext(LogContext);
  if (!logContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return logContext;
}
