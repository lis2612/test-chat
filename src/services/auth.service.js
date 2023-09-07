import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthService = {
  async login(authData) {
    const encryptedAuthData = {
      login: btoa(authData.login),
      password: btoa(authData.password),
    };
    try {
      const response = await axios.post("http://localhost:8008/auth", encryptedAuthData);
      localStorage.setItem("JWT", response.data);
      return response;
      // if (response.status != 200) {
      //   console.log("Autorization error", response);
      //   throw new Error("Authorization error: ", response.status);
      // } else {
      //   localStorage.setItem("JWT", response.data);
      //   return response;
      // }
    } catch (error) {
      console.log("Authorization error: ", error.code);
    }
  },

  isValidToken() {
    return this.getTokenData().exp * 1000 > Date.now();
  },

  getUserName() {
    return this.getTokenData().name;
  },

  getLogin() {
    return this.getTokenData().sub;
  },

  getTokenData() {
    try {
      const JWT = localStorage.JWT;
      if (JWT) return jwtDecode(JWT);
      else return null;
    } catch (error) {
      console.log(error);
    }
  },
};
