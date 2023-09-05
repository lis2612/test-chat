import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth, userName, setUserName } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      setUserName(AuthService.getUserName());
      navigate("/topics");
    }
  }, [navigate, isAuth,setUserName]);

  useEffect(() => {
    document.title = userName ? userName : "Home";
  }, [userName]);

  return (
    <div>
      <div className={styles.container}>Home</div>
    </div>
  );
};

export default Home;
