import React, { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTopAlbums } from "../api/albumsApiService";
import Carousel from "react-elastic-carousel";

export const TopAlbumsSection: FC<{}> = () => {
  const { data: albumsPage, isLoading, isError } = useQuery(
    "topAlbums",
    getTopAlbums
  );

  if (isLoading) {
    return <h2>Loading albums</h2>;
  }

  if (isError) {
    return <h2>Error fetching albums</h2>;
  }

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
        <Carousel
          itemsToShow={3}
          showArrows={false}
          pagination={false}
          preventDefaultTouchmoveEvent={true}>
          {albumsPage?.data.map(album => (
            <div
              className="w-full text-xs text-left outline-none"
              key={album.id}>
              <Link to="/play">
                <div className="flex-row mr-4 space-y-3">
                  <img
                    src={album.cover_medium}
                    alt={`${album.title} cover`}
                    className="object-cover object-center w-full h-24 rounded-lg pointer-events-none"
                  />
                  <div className="w-full space-y-1 overflow-hidden text-white whitespace-no-wrap">
                    <p className="truncate">{album.title}</p>
                    <p className="text-gray-600 truncate">
                      {album.artist?.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};
