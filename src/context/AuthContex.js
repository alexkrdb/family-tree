import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext('default');

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("user authenticated:", user!==null);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider>
  );
};
