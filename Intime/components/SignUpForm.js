import React, { useRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

function SignUpForm({ onSubmit, createChangeTextHandler, isSignUp }) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
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

      {/* <BorderedInput
        placeholder="아이디"
        ref={usernameRef}
        returnKeyType="next"
        onChangeText={createChangeTextHandler('username')}
        onSubmitEditing={() => passwordRef.current.focus()}
        hasMarginBottom
      /> */}
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
    borderColor: '#ee2f48',
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
});

export default SignUpForm;
