import { Artist, ArtistDto } from "./Artist";
import { Album, AlbumDto } from "./Album";

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
