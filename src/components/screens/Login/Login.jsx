import { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { AuthService } from "../../../services/auth.service";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuth, setIsAuth, userName, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = userName ? userName : "Login";
  }, [userName]);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [navigate, isAuth]);

  const [authData, setAuthData] = useState({
    // TODO delete this before production
    login: "user1",
    password: "password1",
  });

  const login = async (e) => {
    e.preventDefault();
    const encryptedAuthData = {
      login: btoa(authData.login),
      password: btoa(authData.password),
    };

    const uName = await AuthService.login(encryptedAuthData);
    setUserName(uName);
    setIsAuth(true);
    setAuthData({
      login: "",
      password: "",
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="login"
          onChange={(e) => setAuthData((prev) => ({ ...prev, login: e.target.value }))}
          value={authData.login}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))}
          value={authData.password}
          name=""
          id=""
        />
        <button onClick={(e) => login(e)}>Login</button>
      </form>
    </div>
  );
}

export default Login;
