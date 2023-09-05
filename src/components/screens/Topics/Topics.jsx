import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { ChatService } from "../../../services/chat.service";
import styles from "./Topics.module.css";
import { AuthService } from "../../../services/auth.service";

const Topics = () => {
  const navigate = useNavigate();
  const { isAuth, userName, setUserName } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      setUserName(AuthService.getUserName());
    }
  }, [navigate, isAuth, setUserName]);

  useEffect(() => {
    document.title = userName ? userName : "Topics";
  }, [userName]);

  useEffect(() => {
    if (isAuth) {
      const getTopics = async () => {
        const data = await ChatService.getTopics();
        const topics = [];
        const keys = Object.keys(data);
        for (let key of keys) {
          topics.push({ id: key, title: data[key] });
        }
        setTopics(topics);
      };
      getTopics();
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
