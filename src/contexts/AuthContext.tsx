import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { createContext, PropsWithChildren, FC, useContext } from "react";
import { FIREBASE_CONFIG } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export interface AuthContextProps {
  user: firebase.User | null;
  loading: boolean;
  error: any;
  signInWithGoogle: () => void;
  signOut: () => void;
  onAuthStateChanged: (
    callback: (user: firebase.User | null) => void
  ) => () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  error: null,
  signInWithGoogle: () => {},
  signOut: () => {},
  onAuthStateChanged: () => () => {}
});

interface Props {}

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const firestore = firebase.firestore();

export const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleAuthProvider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const onAuthStateChanged = (
    callback: (user: firebase.User | null) => void
  ) => {
    return auth.onAuthStateChanged(user => {
      callback(user);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        signOut,
        onAuthStateChanged
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
