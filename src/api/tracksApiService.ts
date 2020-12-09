import { Track } from "../models/Track";
import { deezerService } from "./apiService";

export const getTrack = async (id: number): Promise<Track> => {
  const response = await deezerService.get<Track>(`/track/${id}`);

  return response.data;
};
