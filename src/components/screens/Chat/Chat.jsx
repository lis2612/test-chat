import { Link, useParams } from "react-router-dom"
import styles from "./Chat.module.css"
import { useRef, useState, useEffect } from "react";
import { AuthService } from "../../../services/auth.service";





function Chat() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)
  const socket = useRef()
  const cookieHeader = "token=" + localStorage.JWT + "; path=localhost:8008/";
  document.cookie =cookieHeader

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8008/chat')

    socket.current.onopen = (e) => {
      setConnected(true)
      console.log("Connection open", e);
    };

    socket.current.onmessage = (e) => {
      console.log("Connection open", e);
    };

    socket.current.onclose = (e) => {
      console.log("Connection closed", e);
    };

    socket.current.onerror = (e) => {
      console.log('Connection error',e);
    }

    return () => {
      socket.current.close()
      socket.current.onclose = (e) => {
        console.log("close", e);
      };

  }
  }, [])


  return (
    <div className={`container ${styles.chat}`}>
      <Link to="/topics">Назад</Link>
      <div className="container">Chat #{id}</div>
    </div>
  );
}

export default Chat
