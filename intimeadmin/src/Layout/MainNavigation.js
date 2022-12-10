import styles from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import authContext from "../store/auth-context";
import Button from "../components/UI/Button";

const adminNavigationMenus = [
  { id: "m1", name: "공지사항 관리", href: "/notice" },
  { id: "m2", name: "회원 관리", href: "/user" },
];

const advertiseNavigationMenus = [{ id: "m1", name: "광고 관리", href: "/ad" }];

const logoutNavigationMenus = [
  { id: "m1", name: "로그인", href: "/users/login" },
  { id: "m2", name: "회원가입", href: "/users/signup" },
];

const MainNavigation = () => {
  const navigate = useNavigate();
  const ctx = useContext(authContext);

  const onClickLogo = () => {
    navigate("/");
  };

  let menus;
  if (!ctx.isLoggedIn) {
    menus = logoutNavigationMenus;
  } else if (ctx.type === "admin") {
    menus = adminNavigationMenus;
  } else {
    menus = advertiseNavigationMenus;
  }

  return (
    <header className={styles.header}>
      <div onClick={onClickLogo} className={styles.logo}>
        INTIME
      </div>
      <nav>
        <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              <NavLink
                to={menu.href}
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                {menu.name}
              </NavLink>
            </li>
          ))}
          {ctx.isLoggedIn && (
            <li>
              <Button onClick={ctx.onLogout}>로그아웃</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
