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
    } catch (error) {
      console.log(error);
    }
  },

  isValidToken() {
    console.log("isValidtoken");
    let exp;
    const JWT = localStorage.getItem("JWT");
    if (JWT) {
      exp = jwtDecode(JWT).exp * 1000;
      if (exp > Date.now()) return true;
    } else {
      console.log("JWT not valid");
      return false;
    }
  },

  getUserName() {
    console.log("getUserName");
    const JWT = localStorage.getItem("JWT");
    const userName = jwtDecode(JWT).name;
    return userName;
  },

  getLogin() {
    console.log("getLogin");
    const JWT = localStorage.getItem("JWT");
    const login = jwtDecode(JWT).sub;
    return login;
  },
};
