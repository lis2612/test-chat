import axios from "axios";
import { AuthService } from "./auth.service";

export const ChatService = {
  async getTopics() {
    const token = localStorage.getItem("JWT");
    const login = AuthService.getLogin();
    try {
      const { data } = await axios.get(`http://localhost:8008/topics?token=${token}&login=${login}`);
      return data.result.topics;
    } catch (error) {
      console.log(error);
    }
  },
};
