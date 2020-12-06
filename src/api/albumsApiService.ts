import { Album } from "../models/Album";
import { PagedResponse } from "./apiResponse";
import { deezerService } from "./deezerService";

export const getTopAlbums = async (): Promise<PagedResponse<Album[]>> => {
  try {
    const response = await deezerService.get<PagedResponse<Album[]>>(
      "/chart/0/albums"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return { data: [] };
};
