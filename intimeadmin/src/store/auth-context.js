import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = React.createContext({
  token: "",
  isLoggedIn: false,
  onLogin: (token, refreshToken) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const loginHandler = (token, type) => {
    setToken(token);
    setType(type);
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
  };

  const logoutHandler = () => {
    setToken("");
    setType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setType(localStorage.getItem("type"));
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        type,
        setType,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
