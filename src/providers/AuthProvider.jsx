import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState()
  return <AuthContext.Provider value={{ isAuth, setIsAuth ,userName,setUserName}}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
