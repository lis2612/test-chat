import { Link, useParams } from "react-router-dom"
import styles from "./Chat.module.css"


function Chat() {
  const {id}=useParams()
  return (
    <div className={`container ${styles.chat}`}>
      <Link to="/topics">Назад</Link>
      <div className="container">Chat #{id}</div>
    </div>
  );
}

export default Chat
