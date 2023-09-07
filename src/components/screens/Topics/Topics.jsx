import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { ChatService } from "../../../services/chat.service";
import styles from "./Topics.module.css";

const Topics = () => {
  const navigate = useNavigate();
  const { isAuth, tokenData } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  useEffect(() => {
    document.title = isAuth ? tokenData.name : "Topics";
  }, [tokenData, isAuth]);

  useEffect(() => {
    if (isAuth) {
      ChatService.getTopics().then((data) => {
        const topics = [];
        for (let key of Object.keys(data)) {
          topics.push({ id: key, title: data[key] });
        }
        setTopics(topics);
      });
    }
  }, [isAuth]);

  return (
    <div className={`container ${styles.topics}`}>
      <h2>Список тем</h2>
      {topics.length ? (
        topics.map((topic) => (
          <Link
            to={`/chat/${topic.id}`}
            key={topic.id}>
            {topic.title}
          </Link>
        ))
      ) : (
        <p>Тем пока нет :(</p>
      )}
    </div>
  );
};

export default Topics;
