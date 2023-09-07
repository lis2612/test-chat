import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";
import PropTypes from "prop-types";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState();
  const [tokenData, setTokenData] = useState(AuthService.getTokenData());

  useEffect(() => {
    const tokenData=AuthService.getTokenData()
    if (!tokenData) {
      setIsAuth(false);
    } else {
      setIsAuth(AuthService.isValidToken());
    }
  }, []);

  return <AuthContext.Provider value={{ isAuth, setIsAuth, userName, setUserName,tokenData, setTokenData }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
