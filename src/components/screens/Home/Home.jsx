import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Login";
    console.log("isAuth login", isAuth);
    if (!isAuth) navigate("/login")
  }, [navigate, isAuth]);

  return (
    <div>
      <div className={styles.container}>Home</div>
    </div>
  );
};

export default Home;
