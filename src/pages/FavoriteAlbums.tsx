import React, { FC, useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getGenreById } from "../api/deezerApiService";
import { getUserDocumentByUid } from "../api/firestoreService";
import { AlbumItem } from "../components/AlbumItem";
import { Button } from "../components/Button";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { useAuthContext } from "../contexts/AuthContext";
import { Genre } from "../models/Genre";
import { UserDto } from "../models/User";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";

const Skeleton = () => (
  <div className="grid w-full grid-cols-3 gap-4">
    {Array.from({ length: 12 }, (_, i) => i).map((_, i) => (
      <div key={i} className="flex flex-col w-full space-y-3">
        <div className="w-full h-24 bg-gray-600 rounded-lg"></div>
        <div className="w-12 h-4 bg-gray-600 rounded-lg"></div>
        <div className="w-16 h-4 bg-gray-600 rounded-lg"></div>
      </div>
    ))}
  </div>
);

interface NavigationParams {
  genreId: string;
}

export const FavoriteAlbums: FC = () => {
  const { genreId } = useParams<NavigationParams>();

  const { data: genre } = useQuery<Genre>(
    ["genre", genreId],
    async () => await getGenreById(parseInt(genreId)),
    {
      staleTime: MAX_CACHE_STALE_TIME
    }
  );

  const {
    currentUser,
    loading: isUserLoading,
    error: userError
  } = useAuthContext();

  const [user] = useDocumentDataOnce<UserDto>(
    currentUser && getUserDocumentByUid(currentUser?.uid)
  );

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
        <Button
          className="p-2 text-white hover:bg-gray-700"
          onClick={() => history.goBack()}>
          <ChevronLeft />
        </Button>

        <div className="flex items-center space-x-2 text-lg font-bold">
          Your Favorite Albums
        </div>
        <div className="w-10 ml-auto text-lg font-bold"></div>
      </section>

      <section className="flex flex-col items-center text-gray-600 body-font">
        {isUserLoading && <Skeleton />}

        {userError && <UnexpectedErrorMessage description={userError} />}

        {user?.favoriteAlbums && (
          <div className="grid grid-cols-3 gap-4">
            {user.favoriteAlbums.map(album => (
              <AlbumItem key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
