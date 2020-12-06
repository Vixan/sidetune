import { Artist } from "./Artist";
import { Track } from "./Track";
import { Genre } from "./Genre";

export interface Album {
  id: number;
  title: string;
  label: string;
  genres: { data: Genre[] };
  release_date: string;
  cover_big: string;
  explicit_lyrics: boolean;
  link: string;
  tracklist: string;
  tracks: { data: Track[] };
  artist: Artist;
}
