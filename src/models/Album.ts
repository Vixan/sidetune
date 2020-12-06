import { Artist } from "./Artist";

export interface Album {
  id: number;
  title: string;
  cover_medium: string;
  cover_xl: string;
  link: string;
  tracklist: string;
  artist: Artist;
}