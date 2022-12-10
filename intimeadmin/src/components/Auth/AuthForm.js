import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";
import LoginInput from "./LoginInput";
import SignupInput from "./SignupInput";
import axios from "axios";
import authContext from "../../store/auth-context";

const AuthForm = ({ text }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const [info, setInfo] = useState({});
  const [type, setType] = useState("admin");
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(info);
    try {
      let res;
      if (location.pathname === "/users/login") {
        res = await axios.post(`http://175.45.204.122:8000/login`, info);
        ctx.onLogin(res.headers.authorization, type);
        console.log(res.headers.authorization);
      } else {
        res = await axios.post(`http://175.45.204.122:8000/join-admin`, {
          ...info,
          type,
        });
      }
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err && err.response) {
          if (err.response.status === 422) {
            setError("Email / Password가 잘못 입력되었습니다.");
          } else {
            setError("에러");
          }
        }
      }
    }
  };

  return (
    <form
      className={`${styles.form} ${
        location.pathname === "/users/login"
          ? styles.smallForm
          : styles.largeForm
      }`}
      onSubmit={submitHandler}
    >
      <h2>{text}</h2>
      <div className={styles.input}>
        {location.pathname === "/users/login" ? (
          <LoginInput setInfo={setInfo} type={type} setType={setType} />
        ) : (
          <SignupInput setInfo={setInfo} type={type} setType={setType} />
        )}
        <p className={styles.caution}>{error}</p>
      </div>
      <div className={styles.actions}>
        <Button type="submit">{text}</Button>
      </div>
    </form>
  );
};

export default AuthForm;
