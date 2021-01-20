import React, { FC, useEffect, useState } from "react";
import { BookOpen, ChevronLeft, LogOut, Settings, User } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuthContext } from "../contexts/AuthContext";

const Skeleton = () => (
  <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4 space-y-3 animate-pulse">
    <div className="w-48 h-48 bg-gray-600 rounded-lg"></div>
    <div className="flex flex-col items-center w-full space-y-2">
      <div className="w-1/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-2/4 h-4 bg-gray-600 rounded"></div>
    </div>
  </div>
);

export const UserSettings: FC = () => {
  const { currentUser, signOut, loading: isUserLoading } = useAuthContext();
  const history = useHistory();
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 space-y-4
    ${
      isTransitioning
        ? "ease-in-out transform translate-x-0 opacity-100"
        : "transform translate-x-32 opacity-0 h-full"
    }
  `}>
      <section className="flex items-center text-gray-600 body-font">
        <div className="flex">
          <Button
            className="p-2 text-white hover:bg-gray-700"
            onClick={() => history.goBack()}>
            <ChevronLeft />
          </Button>
        </div>

        <div className="flex items-center ml-auto space-x-2 text-lg font-bold">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
        <div className="w-10 ml-auto text-lg font-bold"></div>
      </section>

      {isUserLoading && <Skeleton />}

      {currentUser && (
        <section className="flex flex-col items-center space-y-16">
          <div className="flex flex-col items-center w-full space-y-4">
            <div className="w-32 h-32 bg-teal-500 rounded-full">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Your avatar"
                  className="w-full h-full rounded-full"></img>
              ) : (
                <User className="w-full h-full p-2 text-gray-800 rounded-full" />
              )}
            </div>
            <div className="text-md">
              <span>{currentUser.displayName}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full space-y-8">
            <Link
              to="/favorite-genres"
              className="flex items-center justify-center w-full p-4 space-x-2 text-gray-600 border-2 border-gray-600 rounded-full hover:bg-gray-700">
              <BookOpen className="w-4 h-4" />
              <span>Change favorite genres</span>
            </Link>
            <Button
              onClick={signOut}
              className="flex items-center justify-center w-full p-4 space-x-2 bg-red-500 hover:bg-red-400">
              <LogOut className="w-4 h-4" /> <span>Sign out</span>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};
