import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await authStorage.get();
        setUser(data);
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
