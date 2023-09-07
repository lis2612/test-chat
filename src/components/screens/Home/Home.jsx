import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth, tokenData } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      navigate("/topics");
    }
  }, [navigate, isAuth]);

  useEffect(() => {
    document.title = tokenData.name ? tokenData.name : "Home";
  }, [tokenData]);

  return (
    <div>
      <div className={styles.container}>Home</div>
    </div>
  );
};

export default Home;
