import axios from 'axios';
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

  const testHandler = async () => {
    const res = await axios.get('http://175.45.204.122:8000/api/user', {
      headers: {Authorization: user},
    });
    console.log(res.data);
  };
  return (
    <View style={styles.fullscreen}>
      <Text>홈</Text>
      <Pressable onPress={logoutHandler} style={styles.button}>
        <Text style={styles.text}>로그아웃</Text>
      </Pressable>
      <Pressable onPress={testHandler} style={styles.button}>
        <Text style={styles.text}>테스트</Text>
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
    marginBottom: 4,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
});
