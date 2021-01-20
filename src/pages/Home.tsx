import React, { FC } from "react";
import { User as UserIcon } from "react-feather";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { getUserDocumentByUid } from "../api/firestoreService";
import { TopAlbumsSection } from "../components/TopAlbumsSection";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { useAuthContext } from "../contexts/AuthContext";
import { User } from "../models/User";
import { getRandomNumber } from "../utils/randomUtils";

export const Home: FC<{}> = () => {
  const { currentUser } = useAuthContext();
  const [user, isUserLoading, userError] = useDocumentDataOnce<User>(
    currentUser && getUserDocumentByUid(currentUser?.uid)
  );

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
              <UserIcon className="w-full h-full p-2 text-gray-800 rounded-full" />
            )}
          </Link>
        </div>

        <span className="ml-auto text-lg font-bold">Sidetune</span>

        <div className="w-10 h-10 ml-auto rounded-full hover:bg-gray-700"></div>
      </header>

      {!isUserLoading && userError && (
        <UnexpectedErrorMessage description={userError.message as string} />
      )}

      <div className="space-y-8">
        <TopAlbumsSection />
        {user && (
          <TopAlbumsSection
            genre={
              user.favoriteGenres[getRandomNumber(user.favoriteGenres.length)]
            }
          />
        )}
      </div>
    </div>
  );
};
