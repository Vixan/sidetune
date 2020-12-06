import React, { FC, useEffect, useState } from "react";
import { ChevronLeft, Heart } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import { getAlbumPlaylist } from "../api/albumsApiService";
import { useQuery } from "react-query";
import { Album } from "../models/Album";

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
    async () => await getAlbumPlaylist(parseInt(id))
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
        <IconButton
          icon={<Heart />}
          className="p-2 ml-auto hover:bg-gray-700"
        />
      </div>

      {isLoading && <Skeleton />}

      {data && (
        <>
          <section className="flex flex-col items-center space-y-2">
            <img
              src={data.cover_big}
              alt="Album cover"
              className="object-cover w-48 h-48 mb-4 rounded-lg shadow-lg"
            />
            <div className="space-x-2 text-xs text-gray-600">
              <span>{data.genres.data?.map(g => g.name).join(", ")}</span>
              <span>·</span>
              <span>{new Date(data.release_date).getFullYear()}</span>
            </div>
            <h1 className="text-lg font-bold text-teal-500">{data.title}</h1>
            <h2 className="text-sm text-gray-600">{data.artist.name}</h2>
          </section>
          <section className="flex flex-col p-4 space-y-2">
            <span className="text-sm text-gray-500">Tracks</span>
            {data.tracks.data.map(track => (
              <div
                className="flex flex-row items-center w-full space-x-2"
                key={track.id}>
                <img
                  src={data.cover_big}
                  className="w-16 h-16 rounded-lg"
                  alt={track.title}
                />
                <div className="h-full overflow-hidden whitespace-no-wrap">
                  <p className="text-sm text-gray-400 truncate">
                    {track.title}
                  </p>
                  <span className="text-xs text-gray-600 truncate">
                    {track.artist.name}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
};
