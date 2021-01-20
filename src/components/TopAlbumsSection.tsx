import React, { FC } from "react";
import Carousel from "react-elastic-carousel";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTopAlbums } from "../api/deezerApiService";
import { Album } from "../models/Album";
import { Genre } from "../models/Genre";
import { PagedResponse } from "../types/apiResponse";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";
import { AlbumItem, AlbumItemSkeleton } from "./AlbumItem";
import { UnexpectedErrorMessage } from "./UnexpectedErrorMessage";

const Skeleton = () => (
  <div className="flex w-full text-xs text-left animate-pulse">
    <AlbumItemSkeleton />
    <AlbumItemSkeleton />
    <AlbumItemSkeleton />
  </div>
);

interface Props {
  genre?: Genre;
}

export const TopAlbumsSection: FC<Props> = ({ genre }) => {
  const { data: albumsPage, isLoading, isError } = useQuery<
    PagedResponse<Album[]>
  >(
    `top${genre?.name || "Trending"}Albums`,
    async () => await getTopAlbums(genre),
    {
      staleTime: MAX_CACHE_STALE_TIME
    }
  );

  return (
    <>
      <section>
        <div className="flex items-center mb-8">
          <h1 className="text-xl text-teal-500">
            Top {genre?.name || "All"} Albums
          </h1>
          <Link
            to={`/top-albums/${genre?.id || 0}`}
            className="ml-auto text-sm text-gray-600 hover:text-gray-500">
            View more
          </Link>
        </div>

        {isLoading && <Skeleton />}

        {isError && (
          <UnexpectedErrorMessage description="Could not load top albums" />
        )}

        {albumsPage?.data && (
          <Carousel
            itemsToShow={3}
            showArrows={false}
            pagination={false}
            preventDefaultTouchmoveEvent={true}>
            {albumsPage?.data.map(album => (
              <AlbumItem
                album={{
                  ...album,
                  genres: album.genres?.data || []
                }}
                key={album.id}
                gap={16}
              />
            ))}
          </Carousel>
        )}
      </section>
    </>
  );
};
