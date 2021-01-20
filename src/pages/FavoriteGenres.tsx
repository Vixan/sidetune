import React, { FC, useEffect, useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft } from "react-feather";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getGenres } from "../api/deezerApiService";
import {
  getUserDocumentByUid,
  tryUpdateUserFavoriteGenres
} from "../api/firestoreService";
import { Button } from "../components/Button";
import { GenreItem } from "../components/GenreItem";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { useAuthContext } from "../contexts/AuthContext";
import { Genre } from "../models/Genre";
import { User } from "../models/User";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";

const Skeleton = () => (
  <div className="grid w-full grid-cols-2 gap-4">
    {Array.from({ length: 8 }, (_, i) => i).map((_, i) => (
      <div key={i} className="flex flex-col items-center w-full space-y-3">
        <div className="w-full h-24 bg-gray-600 rounded-lg"></div>
        <div className="w-10 h-4 bg-gray-600 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export const FavoriteGenres: FC = () => {
  const {
    data: genres,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError
  } = useQuery<Genre[]>(["genres"], async () => await getGenres(), {
    staleTime: MAX_CACHE_STALE_TIME
  });
  const { currentUser } = useAuthContext();
  const [user, isUserLoading, userError] = useDocumentDataOnce<User>(
    currentUser && getUserDocumentByUid(currentUser?.uid)
  );

  const history = useHistory();

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const onChangeGenreChecked = (checked: boolean, genre: Genre) => {
    return checked
      ? setSelectedGenres([...selectedGenres, genre])
      : setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
  };

  const onContinue = async () => {
    if (currentUser) {
      await tryUpdateUserFavoriteGenres(currentUser, selectedGenres);

      history.push("/");
    }
  };

  const individualGenres = genres?.filter(g => g.name !== "All");

  useEffect(() => {
    if (!isUserLoading && user) {
      setSelectedGenres(user.favoriteGenres);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoading]);

  return (
    <div className="relative h-full space-y-4 space-y-8 text-center">
      <section className="flex items-center text-gray-600 body-font">
        <div className="flex">
          <Button
            className="p-2 text-white hover:bg-gray-700"
            onClick={() => history.goBack()}>
            <ChevronLeft />
          </Button>
        </div>

        <div className="flex items-center ml-auto space-x-2 text-lg font-bold">
          <BookOpen className="w-4 h-4" />
          <span>Genres</span>
        </div>
        <div className="w-10 ml-auto text-lg font-bold"></div>
      </section>
      <h1 className="text-lg text-gray-600">Pick your favorite music genres</h1>

      {(isGenreLoading || isUserLoading) && <Skeleton />}
      {isGenreError && (
        <UnexpectedErrorMessage description={genreError as string} />
      )}
      {userError && (
        <UnexpectedErrorMessage description={userError.message as string} />
      )}

      {user && (
        <div className="grid grid-cols-2 gap-4">
          {individualGenres?.map(genre => (
            <GenreItem
              key={genre.id}
              genre={genre}
              isSelected={selectedGenres.some(g => g.id === genre.id)}
              onChange={checked => onChangeGenreChecked(checked, genre)}
            />
          ))}
        </div>
      )}
      <div className="w-full h-16"></div>

      <div className="absolute bottom-0 flex items-center justify-center w-full p-4">
        {individualGenres && user && (
          <Button
            className="fixed p-4 space-x-2 bg-teal-500 hover:bg-teal-400"
            onClick={onContinue}>
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 fill-current" />{" "}
          </Button>
        )}
      </div>
    </div>
  );
};
