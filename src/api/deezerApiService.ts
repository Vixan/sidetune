import { Album } from "../models/Album";
import { PagedResponse } from "../types/apiResponse";
import { deezerService } from "./apiService";
import { TopAlbum } from "../models/TopAlbum";
import { Genre } from "../models/Genre";
import { Track } from "../models/Track";

export const getTopAlbums = async (): Promise<PagedResponse<TopAlbum[]>> => {
  const response = await deezerService.get<PagedResponse<TopAlbum[]>>(
    "/chart/0/albums"
  );

  return response.data;
};

export const getAlbumPlaylist = async (id: number): Promise<Album> => {
  const response = await deezerService.get<Album>(`/album/${id}`);

  return response.data;
};

export const getTrack = async (id: number): Promise<Track> => {
  const response = await deezerService.get<Track>(`/track/${id}`);

  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await deezerService.get<{ data: Genre[] }>(`/genre`);

  return response.data.data;
};
