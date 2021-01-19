import React, { FC } from "react";
import { TopAlbumsSection } from "../components/TopAlbumsSection";
import { Search, User } from "react-feather";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const Home: FC<{}> = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className="space-y-4">
      <header className="flex items-center text-gray-600 body-font">
        <div
          className="w-10 h-10 bg-teal-500 rounded-full"
          title="User settings">
          <Link to="/user">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Your avatar"
                className="w-full h-full rounded-full"></img>
            ) : (
              <User className="w-full h-full p-2 text-gray-800 rounded-full" />
            )}
          </Link>
        </div>

        <span className="ml-auto text-lg font-bold">Sidetune</span>

        <div className="w-10 h-10 ml-auto rounded-full hover:bg-gray-700">
          <Link to="/search">
            <Search className="w-full h-full p-3 text-white" />
          </Link>
        </div>
      </header>
      <TopAlbumsSection />
    </div>
  );
};
