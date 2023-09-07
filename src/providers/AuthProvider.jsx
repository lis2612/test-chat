import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [tokenData, setTokenData] = useState(AuthService.getTokenData());

  useEffect(() => {
    const tokenData = AuthService.getTokenData();
    if (!tokenData) {
      setIsAuth(false);
    } else {
      setIsAuth(AuthService.isValidToken());
    }
  }, []);

  return <AuthContext.Provider value={{ isAuth, setIsAuth, tokenData, setTokenData }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
