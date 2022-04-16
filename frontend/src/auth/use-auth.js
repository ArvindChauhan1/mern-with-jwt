import { useContext, createContext, useState } from "react";
import { login, logout } from "../services/auth-service";
import { getUser } from "../services/user-service";


const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  getUser().then((u) => setUser(u));

  const signin = async (email, password) => {
    const resp = await login(email, password);
    setUser(resp);
    return user;
  };

  const signout = () => {
    logout();
    setUser(null);
    return;
  };
  return {
    user,
    signin,
    signout,
  };
}