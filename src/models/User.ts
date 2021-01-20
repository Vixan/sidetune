import firebase from "firebase/app";
import "firebase/firestore";
import { Album, AlbumDto } from "./Album";
import { Genre, GenreDto } from "./Genre";
import { Track, TrackDto } from "./Track";

export interface User {
  createdDate: firebase.firestore.FieldValue;
  favoriteGenres: Genre[];
  favoriteTracks: Track[];
  favoriteAlbums: Album[];
}

export interface UserDto {
  favoriteGenres: GenreDto[];
  favoriteTracks: TrackDto[];
  favoriteAlbums: AlbumDto[];
}
