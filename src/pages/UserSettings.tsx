import React, { FC, useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { LogOut } from "react-feather";

interface Props {}

export const UserSettings: FC<Props> = (props: Props) => {
  const { user, signOut } = useAuthContext();
  const history = useHistory();
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500
    ${
      isTransitioning
        ? "ease-in-out transform translate-x-0 opacity-100"
        : "transform translate-x-32 opacity-0 h-full"
    }
  `}>
      <header className="flex items-center text-gray-600 body-font">
        <div className="flex">
          <Button
            className="p-2 hover:bg-gray-700"
            onClick={() => history.goBack()}>
            <ChevronLeft />
          </Button>
        </div>

        <span className="ml-auto mr-auto text-lg font-bold">Sidetune</span>
      </header>

      <div className="flex flex-col space-y-16">
        <h1 className="text-lg">
          How are you, <br />
          {user?.displayName}?
        </h1>

        <div className="flex items-center justify-center">
          <Button
            onClick={signOut}
            className="p-4 space-x-2 bg-teal-500 hover:bg-teal-400">
            <LogOut className="w-4 h-4 fill-current" /> <span>Sign out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
