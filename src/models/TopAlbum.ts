import { Artist } from "./Artist";

export interface TopAlbum {
  id: number;
  title: string;
  cover_medium: string;
  link: string;
  artist: Artist;
}