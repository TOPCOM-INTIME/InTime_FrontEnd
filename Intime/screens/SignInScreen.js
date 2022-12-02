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
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';
import {API_URL} from '@env';
import messaging from '@react-native-firebase/messaging';
import {Button} from '@react-native-material/core';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {};
  const {user, setUser} = useUserContext();
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
    if (isSignUp && userData.password !== userData.confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (isSignUp) {
      if (
        userData.username === '' ||
        userData.password === '' ||
        userData.email === ''
      ) {
        Alert.alert('실패', '모든 부분을 입력하셔야 합니다.');
        return;
      }
      const data = {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      };
      console.log(data);
      console.log(API_URL);
      setLoading(true);
      try {
        const res = await axios.post(`${API_URL}/join`, data);
        console.log('결과', res.data);
        navigation.pop();
      } catch (err) {
        console.log('에러');
        console.log(err.response.status);
        if (err.response.status === 500) {
          Alert.alert(
            // 말그대로 Alert를 띄운다
            '이메일 중복', // 첫번째 text: 타이틀 제목
            '다른 이메일을 입력해주세요', // 두번째 text: 그 밑에 작은 제목
            [
              // 버튼 배열
              {text: '확인'}, //버튼 제목
              // 이벤트 발생시 로그를 찍는다
            ],
            {cancelable: false},
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      const data = {
        email: userData.email,
        password: userData.password,
      };
      setLoading(true);
      try {
        const res = await axios.post(`${API_URL}/login`, data);
        console.log('결과', res.headers.authorization);
        console.log('응답:', res.data);
        setUser(res.headers.authorization);
        authStorage.set(res.headers.authorization);
        const deviceToken = await messaging().getToken();
        await axios.put(
          `${API_URL}/api/device-token`,
          {deviceToken},
          {headers: {Authorization: res.headers.authorization}},
        );
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
            {!isSignUp && (
              <Button
                title="비밀번호 변경"
                color="white"
                tintColor="#6c757d"
                onPress={() => navigation.navigate('changePassword')}
                pressableContainerStyle={{paddingVertical: 8}}
              />
            )}
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
    color: '#ee2f48',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
