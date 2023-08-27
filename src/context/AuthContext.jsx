import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import auth from "../firebase";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail =(email)=>{
    return updateEmail(auth.currentUser, email)
  }

  const updateUserPassword=(password)=>{
    return updatePassword(auth.currentUser, password)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, signin, signout, resetPassword,updateUserEmail,updateUserPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
