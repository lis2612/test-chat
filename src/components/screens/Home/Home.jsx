import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, userName } = useContext(AuthContext);

  useEffect(() => {
    document.title = userName ? userName : "Home";
  }, [userName]);

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) navigate("/login");
  }, [navigate, isAuth]);

  return (
    <div>
      <div className={styles.container}>Home</div>
    </div>
  );
};

export default Home;
