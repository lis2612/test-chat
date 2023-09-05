import { createContext, useState } from "react";
import { AuthService } from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
  const [isAuth, setIsAuth] = useState(AuthService.isValidToken());
  const [userName, setUserName] = useState()
  return <AuthContext.Provider value={{ isAuth, setIsAuth ,userName,setUserName}}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
