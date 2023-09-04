import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthService = {
  async login(authData) {
    try {
      const { data } = await axios.post("http://localhost:8008/auth", authData);
      localStorage.setItem("JWT", data);

      // console.log(jwtDecode(data));
      const userName = jwtDecode(data).name;
      return userName;
    } catch (error) {
      console.log(error);
    }
  },
};
