import React, { useRef } from 'react';
import BorderedInput from './BorderedInput';

function SignUpForm({ onSubmit, createChangeTextHandler, isSignUp }) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        placeholder="이메일"
        ref={emailRef}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={createChangeTextHandler('email')}
        onSubmitEditing={() => passwordRef.current.focus()}
        hasMarginBottom
      />

      {/* <BorderedInput
        placeholder="아이디"
        ref={usernameRef}
        returnKeyType="next"
        onChangeText={createChangeTextHandler('username')}
        onSubmitEditing={() => passwordRef.current.focus()}
        hasMarginBottom
      /> */}
      <BorderedInput
        placeholder="비밀번호"
        ref={passwordRef}
        secureTextEntry
        onChangeText={createChangeTextHandler('password')}
        onSubmitEditing={
          isSignUp ? () => confirmPasswordRef.current.focus() : onSubmit
        }
        hasMarginBottom={isSignUp}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          ref={confirmPasswordRef}
          secureTextEntry
          onChangeText={createChangeTextHandler('confirmPassword')}
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignUpForm;
