import React, { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTopAlbums } from "../api/deezerApiService";
import Carousel from "react-elastic-carousel";
import { PagedResponse } from "../types/apiResponse";
import { TopAlbum } from "../models/TopAlbum";
import { CarouselTopAlbum, CarouselTopAlbumSkeleton } from "./CarouselTopAlbum";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";
import { UnexpectedErrorMessage } from "./UnexpectedErrorMessage";

const Skeleton = () => (
  <div className="flex w-full text-xs text-left animate-pulse">
    <CarouselTopAlbumSkeleton />
    <CarouselTopAlbumSkeleton />
    <CarouselTopAlbumSkeleton />
  </div>
);

export const TopAlbumsSection: FC<{}> = () => {
  const { data: albumsPage, isLoading, isError } = useQuery<
    PagedResponse<TopAlbum[]>
  >("topAlbums", getTopAlbums, {
    staleTime: MAX_CACHE_STALE_TIME
  });

  return (
    <>
      <section className="pt-4 pb-4">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl text-teal-500">Top Albums</h1>
          <Link
            to="/"
            className="ml-auto text-sm text-gray-600 hover:text-gray-500">
            View all
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
              <CarouselTopAlbum album={album} key={album.id} />
            ))}
          </Carousel>
        )}
      </section>
    </>
  );
};
