import React, { FC, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  Plus,
  Shuffle
} from "react-feather";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAlbumPlaylist } from "../api/albumsApiService";
import { Button } from "../components/Button";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { Album } from "../models/Album";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";
import { formatSecondsToHms } from "../utils/formatting";

interface NavigationParams {
  albumId: string;
}

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

export const AlbumPlaylist: FC<{}> = () => {
  const { albumId } = useParams<NavigationParams>();
  const [isTransitioning, setTransitioning] = useState(false);
  const { data: album, isLoading, isError } = useQuery<Album>(
    ["albumPlaylist", albumId],
    async () => await getAlbumPlaylist(parseInt(albumId)),
    {
      staleTime: MAX_CACHE_STALE_TIME
    }
  );

  useEffect(() => {
    setTransitioning(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500
    ${
      isTransitioning
        ? "ease-in-out transform translate-x-0 opacity-100"
        : "transform translate-x-32 opacity-0"
    }
    `}>
      <div className="flex mb-4">
        <Link
          to="/"
          className="inline-flex items-center p-2 rounded-full hover:bg-gray-700">
          <ChevronLeft />
        </Link>
        <Button className="p-2 ml-auto hover:bg-gray-700">
          <Heart />
        </Button>
      </div>

      {isLoading && <Skeleton />}

      {isError && (
        <UnexpectedErrorMessage description="Could not load album playlist" />
      )}

      {album && (
        <div className="flex flex-col space-y-6">
          <section className="flex flex-col items-center space-y-2">
            <img
              src={album.cover_big}
              alt="Album cover"
              className="object-cover w-40 h-40 mb-4 rounded-lg shadow-lg"
            />
            <div className="space-x-2 text-xs text-gray-600">
              {album.genres.data.length > 0 && (
                <div className="inline-flex flex-row space-x-2">
                  <span>{album.genres.data?.map(g => g.name).join(", ")}</span>
                  <span>·</span>
                </div>
              )}
              <span>{new Date(album.release_date).getFullYear()}</span>
            </div>
            <p className="text-lg font-bold text-center text-teal-500">
              {album.title}
            </p>
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-white">
              {album.artist.name}
              <ChevronRight size={14} />
            </Link>
            <div className="space-x-2 text-xs text-gray-600">
              <span>{album.tracks.data.length} tracks</span>
              <span>·</span>
              <span>{formatSecondsToHms(album.duration)}</span>
            </div>
          </section>
          <section className="flex space-x-4 text-center">
            <Button className="justify-center flex-grow pt-2 pb-2 pl-6 pr-6 space-x-1 text-sm border-2 border-gray-700 hover:bg-gray-700">
              <Shuffle size={18} className="text-teal-500 fill-current" />
              <span className="text-teal-500">Shuffle</span>
            </Button>
            <Button
              className="justify-center flex-grow pt-2 pb-2 pl-6 pr-6 space-x-1 text-sm text-gray-500 border-2 border-gray-700 hover:bg-gray-700 "
              disabled>
              <Plus size={18} className="fill-current" />
              <span>Add</span>
            </Button>
          </section>
          <section className="flex flex-col space-y-2">
            {album.tracks.data.map(track => (
              <Link
                to={`${albumId}/play/${track.id}`}
                className="flex flex-row items-center w-full space-x-4 rounded-lg cursor-pointer group"
                key={track.id}>
                <div className="flex items-center justify-center flex-none">
                  <div className="absolute flex items-center justify-center w-16 h-16 bg-black rounded-lg opacity-0 group-hover:opacity-50"></div>
                  <Play
                    size="20"
                    className="absolute opacity-0 fill-current group-hover:opacity-100"
                  />
                  <img
                    src={album.cover_big}
                    className="w-16 h-16 rounded-lg"
                    alt={track.title}
                  />
                </div>
                <div className="flex-grow h-full overflow-hidden whitespace-no-wrap">
                  <p className="text-sm text-gray-400 truncate group-hover:text-teal-400">
                    {track.title}
                  </p>
                  <span className="text-xs text-gray-600 truncate">
                    {track.artist.name}
                  </span>
                </div>
                <span className="flex-none text-xs text-gray-600">
                  {formatSecondsToHms(track.duration)}
                </span>
              </Link>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
