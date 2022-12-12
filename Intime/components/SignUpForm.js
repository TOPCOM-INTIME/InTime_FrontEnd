import {Button, HStack} from '@react-native-material/core';
import axios from 'axios';
import React, {useRef, useState} from 'react';
import {TextInput, StyleSheet, Alert} from 'react-native';

function SignUpForm({
  onSubmit,
  createChangeTextHandler,
  isSignUp,
  setIsVerified,
  isVerified,
  userData,
}) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [code, setCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isVeryfying, setIsVerifying] = useState(false);

  const sendEmail = async () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(userData.email)) {
      Alert.alert('실패', '이메일을 확인해 주세요');
      return;
    }
    try {
      const res = await axios.get(
        `http://175.45.204.122:8000/verify?email=${userData.email}`,
      );
      setCode(res.data);
      setIsVerifying(true);
      console.log(res.data);
      Alert.alert('인증번호 전송', '인증번호가 전송되었습니다.');
    } catch (err) {
      console.log(err);
      Alert.alert('실패', '이메일을 확인해주세요.');
    }
  };

  const verify = () => {
    console.log(code, enteredCode);
    if (code === enteredCode) {
      Alert.alert('성공', '인증되었습니다.');
      setIsVerified(true);
      setIsVerifying(false);
      return;
    } else {
      Alert.alert('실패', '인증번호가 일치하지 않습니다.');
      return;
    }
  };

  return (
    <>
      {isSignUp ? (
        <HStack spacing={5}>
          <TextInput
            placeholder="이메일"
            placeholderTextColor="gray"
            ref={emailRef}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={createChangeTextHandler('email')}
            onSubmitEditing={() => sendEmail()}
            style={[styles.input, styles.margin, styles.emailInput]}
          />
          <Button
            color="#6c757d"
            tintColor="white"
            title="인증번호 전송"
            style={[styles.margin, styles.center]}
            onPress={sendEmail}
          />
        </HStack>
      ) : (
        <TextInput
          placeholder="이메일"
          placeholderTextColor="gray"
          ref={emailRef}
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={createChangeTextHandler('email')}
          onSubmitEditing={() => passwordRef.current.focus()}
          style={[styles.input, styles.margin]}
        />
      )}

      {isVeryfying && (
        <HStack spacing={5}>
          <TextInput
            placeholder="인증번호"
            placeholderTextColor="gray"
            onChangeText={setEnteredCode}
            value={enteredCode}
            style={[styles.input, styles.margin, styles.codeInput]}
          />
          <Button
            color="#6c757d"
            tintColor="white"
            title="인증"
            style={[styles.margin, styles.center]}
            onPress={verify}
          />
        </HStack>
      )}
      {isSignUp && (
        <TextInput
          placeholder="닉네임"
          placeholderTextColor="gray"
          ref={usernameRef}
          returnKeyType="next"
          onChangeText={createChangeTextHandler('username')}
          onSubmitEditing={() => passwordRef.current.focus()}
          hasMarginBottom
          style={[styles.input, styles.margin]}
        />
      )}
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="gray"
        ref={passwordRef}
        secureTextEntry
        onChangeText={createChangeTextHandler('password')}
        onSubmitEditing={
          isSignUp ? () => confirmPasswordRef.current.focus() : onSubmit
        }
        style={[styles.input, isSignUp && styles.margin]}
      />
      {isSignUp && (
        <TextInput
          placeholder="비밀번호 확인"
          placeholderTextColor="gray"
          ref={confirmPasswordRef}
          secureTextEntry
          onChangeText={createChangeTextHandler('confirmPassword')}
          onSubmitEditing={onSubmit}
          style={styles.input}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#adb5bd',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
    placeholderTextColor: '#000',
  },
  margin: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    width: '80%',
  },
  emailInput: {
    width: '65%',
  },
});

export default SignUpForm;
