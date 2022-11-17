import React, {useContext, createContext, useState, useEffect} from 'react';
import {useUserContext} from './UserContext';
import axios from 'axios';
const LogContext = createContext(null);

export function LogContextProvider({children}) {
  const [patterns, setPatterns] = useState([]);
  const [patternGroups, setPatternGroups] = useState([]);
  const {user} = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPattern = await axios.get(
          'http://175.45.204.122:8000/api/readypatterns/origin',
          {
            headers: {Authorization: user},
          },
        );
        console.log('콘텍스트 패턴', fetchedPattern.data);
        setPatterns(fetchedPattern.data);
        const fetchedGroup = await axios.get(
          'http://175.45.204.122:8000/api/groups-with-patterns/all',
          {
            headers: {Authorization: user},
          },
        );
        console.log('콘텍스트 그룹', fetchedGroup.data);
        setPatternGroups(fetchedGroup.data);
      } catch (err) {
        console.error(err);
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
