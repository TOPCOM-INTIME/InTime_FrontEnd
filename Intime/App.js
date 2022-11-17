import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {LogContextProvider} from './contexts/LogContext';

function App() {
  return (
    <>
      <UserContextProvider>
        <LogContextProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </LogContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
