import React, { FC, useEffect, useState } from "react";
import { ChevronLeft, Heart } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import { getAlbumPlaylist } from "../api/albumsApiService";
import { useQuery } from "react-query";

interface NavigationParams {
  id: string;
}

export const AlbumPlaylist: FC<{}> = () => {
  const { id } = useParams<NavigationParams>();
  const [isTransitioning, setTransitioning] = useState(false);
  const { data } = useQuery(
    "albumPlaylist",
    async () => await getAlbumPlaylist(parseInt(id))
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
        <IconButton
          icon={<Heart />}
          className="p-2 ml-auto hover:bg-gray-700"
        />
      </div>
    </div>
  );
};
