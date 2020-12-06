import { Artist } from "./Artist";

export interface Track {
  id: number;
  title: string;
  duration: number;
  link: string;
  explicit_lyrics: boolean;
  artist: Artist;
}