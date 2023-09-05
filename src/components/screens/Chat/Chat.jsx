import { Link, useParams } from "react-router-dom";
import styles from "./Chat.module.css";
import { useRef, useState, useEffect } from "react";
import { AuthService } from "../../../services/auth.service";

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [login, setLogin] = useState(AuthService.getLogin());
  const [title, setTitle] = useState(id);
  const socket = useRef();
  const cookieHeader = "token=" + localStorage.JWT + "; path=localhost:8008/";
  document.cookie = cookieHeader;

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:8008/chat");

    socket.current.onopen = () => {
      setConnected(true);
      const initMessage = {
        login: login,
        topics: +id,
      };
      socket.current.send(JSON.stringify(initMessage));
    };

    socket.current.onmessage = (e) => {
      const incomeMessage = JSON.parse(e.data);
      console.log("incomeMessage: ", incomeMessage);
      if (incomeMessage.result) {
      setTitle(incomeMessage.topics);

        const sortedMessages = incomeMessage.result.sort((a, b) => a.id - b.id);
        setMessages(sortedMessages);
      } else {
        console.log("Add new message");


        setMessages((prev)=>([...prev,incomeMessage]));
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

  // useEffect(() => {
  //   console.log("Messages", messages);
  // }, [messages]);

  useEffect(() => {
    connect();
    return () => {
      socket.current.close();
      socket.current.onclose = (e) => {
        console.log("Connection closed", e);
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
