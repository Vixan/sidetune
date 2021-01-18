import React, { FC, useEffect } from "react";
import { Button } from "../components/Button";
import { ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { User } from "../models/User";

interface Props {}

export const SignIn: FC<Props> = () => {
  const { currentUser, signInWithGoogle } = useAuthContext();

  useEffect(() => {
    const createUser = async () => {
      if (currentUser) {
        const firestore = firebase.firestore();
        const usersCollection = firestore.collection("users");
  
        const currentUserInDb = await usersCollection.doc(currentUser.uid).get();
  
        if (!currentUserInDb?.exists) { 
          const user: User = {
            createdDate: firebase.firestore.FieldValue.serverTimestamp()
          };
          usersCollection.doc(currentUser.uid).set(user);
        }
      }
    }

    createUser();
  }, [currentUser]);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button
        onClick={signInWithGoogle}
        className="p-4 space-x-2 bg-teal-500 hover:bg-teal-400">
        <GoogleIcon className="w-4 h-4 fill-current" />{" "}
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
};
