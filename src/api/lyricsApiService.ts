import { lyricsOvhService } from "./apiService";

export const getLyrics = async (
  authorName: string,
  trackName: string
): Promise<string> => {
  const response = await lyricsOvhService.get<{ lyrics: string }>(
    `/${authorName}/${trackName}`
  );

  return response.data.lyrics;
};
