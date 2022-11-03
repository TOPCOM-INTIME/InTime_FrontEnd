import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import authStorage from '../stroages/authStorage';

function HomeStack() {
  const {user, setUser} = useUserContext();
  const logoutHandler = () => {
    authStorage.remove();
    setUser(null);
  };
  return (
    <View style={styles.fullscreen}>
      <Text>홈</Text>
      <Pressable onPress={logoutHandler} style={styles.button}>
        <Text style={styles.text}>로그아웃</Text>
      </Pressable>
    </View>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    height: 48,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee2f48',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
});
