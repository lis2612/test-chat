import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./Chat.module.css";

const Messages = ({ messagesArr }) => {
  const messages = messagesArr.sort((a, b) => a.id - b.id);
  useEffect(() => {
    const messagesBox = document.getElementById("messagesBox");
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, [messages]);

  return (
    <div
      className={styles.messages}
      id="messagesBox">
      {messages.length ? (
        messages.map((message) => (
          <div
            className={styles.message}
            key={message.id}>
            <h3>{message.login}</h3>
            <p>{message.message}</p>
          </div>
        ))
      ) : (
        <p>Сообщений нет</p>
      )}
    </div>
  );
};
Messages.propTypes = {
  messagesArr: PropTypes.array.isRequired,
};
export default Messages;
