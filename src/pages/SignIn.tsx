import React, { FC } from "react";
import { Button } from "../components/Button";
import { ReactComponent as GoogleIcon } from "../icons/google.svg";
import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

interface Props {}

export const SignIn: FC<Props> = () => {
  const { user, signInWithGoogle } = useAuthContext();

  if (user) {
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
