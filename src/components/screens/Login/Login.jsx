import { useState } from "react";
import styles from "./Login.module.css";
import { AuthService } from "../../../services/auth.service";

function Login() {
  const [authData, setAuthData] = useState({
    // TODO delete this before production
    login: "user1",
    password: "password1",
  });

  const login = (e) => {
    e.preventDefault();
    const encryptedAuthData = {
      login: btoa(authData.login),
      password: btoa(authData.password),
    };

    AuthService.login(encryptedAuthData);

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