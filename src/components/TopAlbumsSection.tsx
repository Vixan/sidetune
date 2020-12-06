import React, { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTopAlbums } from "../api/albumsApiService";
import Carousel from "react-elastic-carousel";
import { PagedResponse } from "../api/apiResponse";
import { TopAlbum } from "../models/TopAlbum";
import { CarouselTopAlbum, CarouselTopAlbumSkeleton } from "./CarouselTopAlbum";

export const TopAlbumsSkeleton = () => (
  <div className="flex w-full text-xs text-left animate-pulse">
    <CarouselTopAlbumSkeleton />
    <CarouselTopAlbumSkeleton />
    <CarouselTopAlbumSkeleton />
  </div>
);

export const TopAlbumsSection: FC<{}> = () => {
  const { data: albumsPage, isLoading, isError } = useQuery<
    PagedResponse<TopAlbum[]>
  >(
    "topAlbums",
    getTopAlbums
    // () =>
    //   fetch("https://jsonplaceholder.typicode.com/todos/1").then(f => f.json())
  );

  console.log(albumsPage?.data);

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
        {isLoading && <TopAlbumsSkeleton />}
        {isError && (
          <div className="flex w-full text-center align-middle">
            <h1 className="text-red-600">
              An error has occured when fetching top albums
            </h1>
          </div>
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
