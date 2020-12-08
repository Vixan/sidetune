import { Album } from "../models/Album";
import { PagedResponse } from "./apiResponse";
import { deezerService } from "./deezerService";
import { TopAlbum } from "../models/TopAlbum";

export const getTopAlbums = async (): Promise<PagedResponse<TopAlbum[]>> => {
  const response = await deezerService.get<PagedResponse<TopAlbum[]>>(
    "/chart/0/albums"
  );

  return response.data;
};

export const getAlbumPlaylist = async (id: number): Promise<Album | null> => {
  const response = await deezerService.get<Album>(`/album/${id}`);

  return response.data;
};
