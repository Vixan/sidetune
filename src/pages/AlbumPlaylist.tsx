import React, { FC, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Play, Plus, Shuffle } from "react-feather";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAlbumPlaylist } from "../api/albumsApiService";
import { Button } from "../components/Button";
import { Album } from "../models/Album";
import { formatSecondsToHms } from "../utils/formatting";

interface NavigationParams {
  id: string;
}

const Skeleton = () => (
  <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4 space-y-3">
    <div className="w-48 h-48 bg-gray-600 rounded-lg"></div>
    <div className="flex flex-col items-center w-full space-y-2">
      <div className="w-1/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-2/4 h-4 bg-gray-600 rounded"></div>
    </div>
  </div>
);

export const AlbumPlaylist: FC<{}> = () => {
  const { id } = useParams<NavigationParams>();
  const [isTransitioning, setTransitioning] = useState(false);
  const { data, isLoading, isError } = useQuery<Album | null>(
    "albumPlaylist",
    async () => await getAlbumPlaylist(parseInt(id)),
    {
      // INFO: Use cached data for 10 mins for all queries until it will be considered "old" and re-fetched
      staleTime: 600000
    }
  );

  useEffect(() => {
    setTransitioning(true);
  }, []);

  console.log(data);

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

      {data && (
        <div className="flex flex-col space-y-6">
          <section className="flex flex-col items-center space-y-2">
            <img
              src={data.cover_big}
              alt="Album cover"
              className="object-cover w-40 h-40 mb-4 rounded-lg shadow-lg"
            />
            <div className="space-x-2 text-xs text-gray-600">
              <span>{data.genres.data?.map(g => g.name).join(", ")}</span>
              <span>·</span>
              <span>{new Date(data.release_date).getFullYear()}</span>
            </div>
            <h1 className="text-lg font-bold text-teal-500">{data.title}</h1>
            <Link
              to="/"
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-white">
              {data.artist.name}
              <ChevronRight size={14} />
            </Link>
            <div className="space-x-2 text-xs text-gray-600">
              <span>{data.tracks.data.length} tracks</span>
              <span>·</span>
              <span>{formatSecondsToHms(data.duration)}</span>
            </div>
          </section>
          <section className="flex space-x-4 text-center">
            <Button className="justify-center flex-grow pt-2 pb-2 pl-6 pr-6 space-x-1 text-sm border-2 border-gray-700 hover:bg-gray-700">
              <Shuffle size={18} className="text-teal-500 fill-current" />
              <span className="text-teal-500">Shuffle</span>
            </Button>
            <Button
              className="justify-center flex-grow pt-2 pb-2 pl-6 pr-6 space-x-1 text-sm border-2 border-gray-700 hover:bg-gray-700"
              disabled>
              <Plus size={18} className="text-gray-500 fill-current" />
              <span className="text-gray-500">Add</span>
            </Button>
          </section>
          <section className="flex flex-col space-y-2">
            {data.tracks.data.map(track => (
              <div
                className="flex flex-row items-center w-full space-x-4 hover:bg"
                key={track.id}>
                <img
                  src={data.cover_big}
                  className="flex-none w-16 h-16 rounded-lg"
                  alt={track.title}
                />
                <div className="flex-grow h-full max-w-sm overflow-hidden whitespace-no-wrap">
                  <p className="text-sm text-gray-400 truncate">
                    {track.title}
                  </p>
                  <span className="text-xs text-gray-600 truncate">
                    {track.artist.name}
                  </span>
                </div>
                <span className="flex-none text-xs text-gray-600">
                  {formatSecondsToHms(track.duration)}
                </span>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
