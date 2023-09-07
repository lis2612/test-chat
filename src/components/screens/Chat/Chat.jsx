import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import styles from "./Chat.module.css";
import Messages from "./Messages";

function Chat() {
  const { isAuth, tokenData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [title, setTitle] = useState(id);
  const [isModalShow, setIsModalShow] = useState(false);
  const socket = useRef();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  useEffect(() => {
    if (!messages.length && connected) setIsModalShow(true);
  }, [messages]);

  useEffect(() => {
    document.title = tokenData.name ? tokenData.name : "Topics";
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
  }, [tokenData, connected]);

  const connect = () => {
    const cookieHeader = "token=" + localStorage.JWT + "; path=localhost:8008/";
    document.cookie = cookieHeader;
    socket.current = new WebSocket("ws://localhost:8008/chat");

    socket.current.onopen = () => {
      console.log("Open connection");
      setConnected(true);
      const initMessage = {
        login: tokenData.sub,
        topics: +id,
      };
      try {
        socket.current.send(JSON.stringify(initMessage));
      } catch (error) {
        console.log("Error sending init message");
      }
    };

    socket.current.onmessage = (e) => {
      const incomeMessage = JSON.parse(e.data);
      if (incomeMessage.result) {
        setTitle(incomeMessage.topics);
        setMessages(incomeMessage.result);
        if(!incomeMessage.result.length) setIsModalShow(true)
      } else {
        setMessages((prev) => [...prev, incomeMessage]);
      }
    };

    socket.current.onerror = (e) => {
      console.log("Connection error", e);
    };
  };

  const sendMessage = async () => {
    const message = {
      login: tokenData.sub,
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
      {isModalShow && (
        <div
          className={styles.modal}
          id="modal">
          <p>В этом чате пока нет сообщений</p>
          <button
            onClick={() => {
              setIsModalShow(false);
            }}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
