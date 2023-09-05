import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthService = {
  async login(authData) {
    const encryptedAuthData = {
      login: btoa(authData.login),
      password: btoa(authData.password),
    };
    try {
      const { data } = await axios.post("http://localhost:8008/auth", encryptedAuthData);
      localStorage.setItem("JWT", data);
      const userName = jwtDecode(data).name;
      return userName;
    } catch (error) {
      console.log(error);
    }
  },
  isValidToken() {
    let exp;
    const JWT = localStorage.getItem("JWT");
    if (JWT) exp = jwtDecode(JWT).exp*1000;
    else return false;
    if (exp > Date.now()) return true;
    else return false;
  },
};
