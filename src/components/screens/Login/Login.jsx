import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { AuthService } from "../../../services/auth.service";
import styles from "./Login.module.css";

function Login() {
  const { isAuth, setIsAuth, setTokenData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Вход";
  }, []);

  useEffect(() => {
    if (isAuth) navigate("/topics");
  }, [navigate, isAuth]);

  const [authData, setAuthData] = useState({
    login: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault();
    AuthService.login(authData).then(() => {
      setTokenData(AuthService.getTokenData());
      setIsAuth(true);
    });
    setAuthData({
      login: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <form className={styles.form}>
        <input
          type="text"
          placeholder="имя пользователя"
          onChange={(e) => setAuthData((prev) => ({ ...prev, login: e.target.value }))}
          value={authData.login}
        />
        <input
          type="password"
          placeholder="пароль"
          onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))}
          value={authData.password}
          name=""
          id=""
        />
        <button onClick={(e) => login(e)}>Войти</button>
      </form>
    </div>
  );
}

export default Login;
