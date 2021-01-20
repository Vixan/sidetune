import React, { FC } from "react";
import { Link } from "react-router-dom";
import { AlbumDto } from "../models/Album";

interface Props {
  album: AlbumDto;
  gap?: number;
}

export const AlbumItem: FC<Props> = ({ album, gap = 0 }) => {
  return (
    <div
      className="w-full text-xs text-left outline-none hover:opacity-75"
      title={album.title}>
      {/* TODO: Fix mouse button release navigating to link */}
      <Link to={`/album/${album.id}`}>
        <div className="flex-row space-y-3" style={{ marginRight: gap }}>
          <img
            src={album.cover_medium}
            alt={`${album.title} cover`}
            className="object-cover object-center w-full h-24 rounded-lg pointer-events-none"
          />
          <div className="w-full space-y-1 overflow-hidden text-white whitespace-no-wrap">
            <p className="truncate">{album.title}</p>
            <p className="text-gray-600 truncate">{album.artist?.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const AlbumItemSkeleton: FC<{}> = () => {
  return (
    <div className="flex flex-col w-1/3 mr-4 space-y-3">
      <div className="w-full h-24 bg-gray-600 rounded-lg"></div>
      <div className="w-full space-y-2">
        <div className="h-4 bg-gray-600 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};
