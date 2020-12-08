import { Artist } from "./Artist";
import { Album } from "./Album";

export interface Track {
  id: number;
  title: string;
  duration: number;
  link: string;
  explicit_lyrics: boolean;
  artist: Artist;
  album: Album;
  preview: string;
}
