import React, { ChangeEvent, FC, HTMLAttributes, useState } from "react";
import { ArrowRight } from "react-feather";
import { useQuery } from "react-query";
import { getGenres } from "../api/deezerApiService";
import { Button } from "../components/Button";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { Genre } from "../models/Genre";
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

interface CheckboxProps {
  checked: boolean;
  label?: string;
}

const Checkbox: FC<CheckboxProps & HTMLAttributes<HTMLInputElement>> = ({
  checked = false,
  onChange,
  label = null,
  ...className
}) => {
  return (
    <div {...className}>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="w-5 h-5 text-pink-500 rounded form-checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label && <span className="ml-2 text-gray-700">label</span>}
      </label>
    </div>
  );
};

interface GenreItemProps {
  genre: Genre;
  isSelected: boolean;
  onChange: (checked: boolean) => void;
}

export const GenreItem: FC<GenreItemProps> = ({
  genre: { name, picture_medium },
  isSelected,
  onChange
}) => {
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="text-xs text-left outline-none cursor-pointer hover:opacity-75" onClick={() => onChange(!isSelected)}>
      <div className="relative flex-row space-y-3">
        <img
          src={picture_medium}
          alt={`${name} cover`}
          className="object-cover object-center w-full h-24 rounded-lg pointer-events-none"
        />
        {isSelected && <Checkbox
          checked={isSelected}
          onChange={onValueChange}
          className="absolute top-0 ml-3"
        />}
        <div className="w-full space-y-1 overflow-hidden text-center text-white whitespace-no-wrap">
          <p className="text-gray-600 truncate">{name}</p>
        </div>
      </div>
    </div>
  );
};

interface Props {}

export const FavoriteArtists: FC<Props> = (props: Props) => {
  const {
    data: genres,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error
  } = useQuery<Genre[]>(["genres"], async () => await getGenres(), {
    staleTime: MAX_CACHE_STALE_TIME
  });
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  console.log(selectedGenreIds);

  return (
    <div className="relative h-full space-y-8">
      <h1 className="text-lg">Pick your favorite music genres</h1>

      {isGenreLoading && <Skeleton />}
      {isGenreError && <UnexpectedErrorMessage description={error as string} />}

      <div className="grid grid-cols-2 gap-4">
        {genres?.map(genre => (
          <GenreItem
            key={genre.id}
            genre={genre}
            isSelected={selectedGenreIds.includes(genre.id)}
            onChange={checked =>
              checked
                ? setSelectedGenreIds([...selectedGenreIds, genre.id])
                : setSelectedGenreIds(
                    selectedGenreIds.filter(g => g !== genre.id)
                  )
            }
          />
        ))}
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full p-4">
        {genres && (
          <Button className="fixed p-4 space-x-2 bg-teal-500 hover:bg-teal-400">
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 fill-current" />{" "}
          </Button>
        )}
      </div>
    </div>
  );
};
