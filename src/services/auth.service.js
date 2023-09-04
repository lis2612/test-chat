import axios from "axios";

// const ax = axios.create({
//   baseUrl: "http://localhost:8008",
// });

export const AuthService = {
  async login(authData) {
    try {
      const response = await axios.post("http://localhost:8008/auth", authData);
      localStorage.setItem("token",response.data)
      return response.data
    } catch (error) {
      console.log(error);
    }
  },
};
