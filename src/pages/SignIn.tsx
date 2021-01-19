import "firebase/firestore";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getUserDocumentByUid,
  tryCreateAuthAssociatedUser
} from "../api/firestoreService";
import { ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import { Button } from "../components/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { ReactComponent as Logo } from "../assets/logo.svg";

interface Props {}

export const SignIn: FC<Props> = () => {
  const { currentUser, signInWithGoogle } = useAuthContext();

  const history = useHistory();

  useEffect(() => {
    const createUser = async () => {
      if (currentUser) {
        const user = await getUserDocumentByUid(currentUser.uid).get();

        if (!user.exists) {
          await tryCreateAuthAssociatedUser(currentUser);

          history.push("/favorite-genres");
        } else {
          history.push("/");
        }
      }
    };

    createUser();
  }, [currentUser, history]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full space-y-20">
      <Logo className="w-40 h-40" />
      <Button
        onClick={signInWithGoogle}
        className="p-4 space-x-2 text-gray-800 bg-gray-400 hover:bg-white">
        <GoogleIcon className="w-4 h-4 fill-current" />
        <span>Sign in with Google</span>
      </Button>

      <div className="absolute bottom-0 text-sm text-gray-600">Made by Duca Vitalie-Alexandru</div>
    </div>
  );
};
