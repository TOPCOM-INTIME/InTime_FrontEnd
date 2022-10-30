import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import SignButtons from '../components/SignButtons';
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';

function SignInScreen({navigate, route}) {
  const {isSignUp} = route.params || {};
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const createChangeTextHandler = name => value => {
    setUserData({...userData, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (userData.password !== userData.confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (isSignUp) {
      const data = {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      };
      console.log(data);
      setLoading(true);
      try {
        const res = await axios.post(
          'http://175.45.204.122:8000/http/post',
          null,
          {params: {...data}},
        );
        console.log('결과', res.data);
      } catch (err) {
        console.log('에러');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullscreen}>
          <Text style={styles.text}>InTime</Text>
          <View style={styles.form}>
            <SignUpForm
              onSubmit={onSubmit}
              isSignUp={isSignUp}
              createChangeTextHandler={createChangeTextHandler}
            />
            <SignButtons
              onSubmit={onSubmit}
              isSignUp={isSignUp}
              loading={loading}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
