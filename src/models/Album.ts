import { Artist, ArtistDto } from "./Artist";
import { Genre, GenreDto } from "./Genre";
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

export interface AlbumDto
  extends Pick<Album, "id" | "release_date" | "title" | "cover_medium"> {
  artist: ArtistDto;
  genres: GenreDto[];
}
