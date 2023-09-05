import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { AuthService } from "../../../services/auth.service";
import styles from "./Login.module.css";

function Login() {
  const { isAuth, setIsAuth, userName, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = userName ? userName : "Login";
  }, [userName]);

  useEffect(() => {
    if (isAuth) navigate("/topics");
  }, [navigate, isAuth]);

  const [authData, setAuthData] = useState({
    // TODO delete this before production
//     user1 password1
// Michele password145
// user15 passwordPass
// cassandra passwordP
    login: "Michele",
    password: "password145",
  });

  const login = async (e) => {
    e.preventDefault();
    await AuthService.login(authData);
    setUserName(AuthService.getUserName());
    setIsAuth(true);
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
