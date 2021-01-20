import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Track } from "./Track";

export interface Album {
  artist: Artist;
  cover_big: string;
  cover_medium: string;
  duration: number;
  explicit_lyrics: boolean;
  genres: { data: Genre[] };
  id: number;
  label: string;
  link: string;
  release_date: string;
  title: string;
  tracklist: string;
  tracks: { data: Track[] };
}
