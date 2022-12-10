import React, { Fragment, useRef, useState } from "react";
import styles from "./LoginInput.module.css";

const LoginInput = ({ setInfo, type, setType }) => {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const changeHandler = () => {
    setInfo({
      email: emailRef.current.value,
      username: nameRef.current.value,
      password: password1Ref.current.value,
    });
  };

  return (
    <Fragment>
      <div className={styles.type}>
        <h3>가입 종류</h3>
        <div>
          <input
            type="radio"
            id="admin"
            name="type"
            value="admin"
            checked={type === "admin"}
            onChange={(event) => setType(event.target.value)}
          />
          <label htmlFor="admin">관리자</label>
          <input
            type="radio"
            id="ad"
            name="type"
            value="advertise"
            checked={type === "advertise"}
            onChange={(event) => setType(event.target.value)}
          />
          <label htmlFor="ad">기업 회원</label>
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="id">Email</label>
        <input type="text" id="id" ref={emailRef} onChange={changeHandler} />
      </div>
      <div className={styles.control}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameRef} onChange={changeHandler} />
      </div>
      <div className={styles.control}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password1"
          ref={password1Ref}
          onChange={changeHandler}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          id="password2"
          ref={password2Ref}
          onChange={changeHandler}
        />
      </div>
    </Fragment>
  );
};

export default LoginInput;
