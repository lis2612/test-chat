import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { AuthService } from "../../../services/auth.service";
import styles from "./Chat.module.css";
import Messages from "./Messages";

function Chat() {
  const { id } = useParams();
  const { isAuth, userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [login, setLogin] = useState();
  const [title, setTitle] = useState(id);
  const socket = useRef();

  useEffect(() => {
    AuthService.getTokenData()
    if (!isAuth) {
      navigate("/login");
    } else {
      setLogin(AuthService.getLogin());
    }
  }, [isAuth]);

  useEffect(() => {
    document.title = userName ? userName : "Topics";
    if (!connected)
      try {
        connect();
      } catch (error) {
        console.log("Error while connecting", error);
      }
    return () => {
      if (connected) {
        socket.current.close();
        setConnected(false);
        socket.current.onclose = () => {
          console.log("Connection closed");
        };
      }
    };
  }, [login]);

  const connect = () => {
    const cookieHeader = "token=" + localStorage.JWT + "; path=localhost:8008/";
    document.cookie = cookieHeader;
    socket.current = new WebSocket("ws://localhost:8008/chat");

    socket.current.onopen = () => {
      console.log("Open connection");
      setConnected(true);
      const initMessage = {
        login: login,
        topics: +id,
      };
      try {
        socket.current.send(JSON.stringify(initMessage));
      } catch (error) {
        console.log("Error sending init message:", error);
      }
    };

    socket.current.onmessage = (e) => {
      const incomeMessage = JSON.parse(e.data);
      console.log("incomeMessage: ", incomeMessage);
      if (incomeMessage.result) {
        setTitle(incomeMessage.topics);
        setMessages(incomeMessage.result);
      } else {
        console.log("Add new message");
        setMessages((prev) => [...prev, incomeMessage]);
      }
    };

    socket.current.onerror = (e) => {
      console.log("Connection error", e);
    };
  };

  const sendMessage = async () => {
    const message = {
      login: login,
      topics: +id,
      message: newMessage,
    };
    socket.current.send(JSON.stringify(message));
    setNewMessage("");
  };

  return (
    <div className="container">
      <Link to="/topics">Назад</Link>
      <h2>{title}</h2>
      <div className={styles.chat}>
        <Messages messagesArr={messages} />
        <div className={styles.formMessage}>
          <input
            className={styles.inputMessage}
            type="text"
            placeholder="Сообщение"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            className={styles.sendMessageBtn}
            onClick={sendMessage}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
