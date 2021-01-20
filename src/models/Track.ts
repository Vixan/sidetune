import { Album } from "./Album";
import { Artist } from "./Artist";

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

export interface TrackDto {
  id: number;
  title: string;
}
