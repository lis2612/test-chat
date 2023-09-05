import { Link, useParams } from "react-router-dom";
import styles from "./Chat.module.css";
import { useRef, useState, useEffect } from "react";
import { AuthService } from "../../../services/auth.service";

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
  const [connected, setConnected] = useState(false);
  const [title, setTitle] = useState(id);
  const socket = useRef();
  const cookieHeader = "token=" + localStorage.JWT + "; path=localhost:8008/";
  document.cookie = cookieHeader;

  useEffect(() => {
    console.log("Messages", messages);
  });

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8008/chat");

    socket.current.onopen = () => {
      setConnected(true);
      const initMessage = {
        login: AuthService.getLogin(),
        topics: +id,
      };
      socket.current.send(JSON.stringify(initMessage));
    };

    socket.current.onmessage = (e) => {
      if (title === id) setTitle(JSON.parse(e.data).topics);
      setMessages(JSON.parse(e.data).result);
    };

    socket.current.onclose = (e) => {
      console.log("Connection closed", e);
    };

    socket.current.onerror = (e) => {
      console.log("Connection error", e);
    };

    return () => {
      socket.current.close();
      socket.current.onclose = (e) => {
        console.log("close", e);
      };
    };
  }, []);

  return (
    <div className="container">
      <Link to="/topics">Назад</Link>

      <h2>{title}</h2>
      <div className={styles.chat}>
        <div className={styles.messages}>
          {messages.length ? (
            messages.map((message) => (
              <div
                className={styles.message}
                key={message.id}>
                <h3>
                  {message.login} {message.id}
                </h3>
                <p>{message.message}</p>
              </div>
            ))
          ) : (
            <p>There are no messages</p>
          )}
        </div>
        <div className={styles.formMessage}>
          <input className={styles.inputMessage} type="text" placeholder="Сообщение" />
          <button className={styles.sendMessageBtn}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
