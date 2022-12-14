import React, {useContext, createContext, useState, useEffect} from 'react';
import {useUserContext} from './UserContext';
import axios from 'axios';
import {API_URL} from '@env';

const LogContext = createContext(null);

export function LogContextProvider({children}) {
  const [patterns, setPatterns] = useState([]);
  const [patternGroups, setPatternGroups] = useState([]);
  const [friendInvite, setFriendInvite] = useState([]);
  const [scheduleInvite, setScheduleInvite] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedPattern = await axios.get(
          `${API_URL}/api/readypatterns/origin`,
          {
            headers: {Authorization: user},
          },
        );
        setPatterns(fetchedPattern.data);
        console.log('패턴 완');
        const fetchedGroup = await axios.get(
          `${API_URL}/api/groups-with-patterns/all`,
          {
            headers: {Authorization: user},
          },
        );
        setPatternGroups(fetchedGroup.data);
        console.log('그룹 완');
        const fetchedInvitation = await axios.get(
          `${API_URL}/friends/request`,
          {
            headers: {Authorization: user},
          },
        );
        setFriendInvite(fetchedInvitation.data);
        console.log('친구초대 완');
        const fetchedSchedule = await axios.get(
          `${API_URL}/api/schedule-invitations`,
          {
            headers: {Authorization: user},
          },
        );
        setScheduleInvite(fetchedSchedule.data);
        console.log('일정초대 완');
      } catch (err) {
        console.error('로그 컨텍스트 에러', err);
      }
      setIsLoading(false);
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <LogContext.Provider
      children={children}
      value={{
        patterns,
        setPatterns,
        patternGroups,
        setPatternGroups,
        friendInvite,
        setFriendInvite,
        scheduleInvite,
        setScheduleInvite,
        isLoading,
        setIsLoading,
      }}
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
