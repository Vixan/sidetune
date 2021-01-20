import firebase from "firebase/app";
import "firebase/firestore";
import { AlbumDto } from "../models/Album";
import { Genre, GenreDto } from "../models/Genre";
import { Log, LogLevel } from "../models/Log";
import { TrackDto } from "../models/Track";
import { User } from "../models/User";

export const logError = (message: string, userUId?: string) => {
  const firestore = firebase.firestore();
  const usersCollection = firestore.collection("logs");
  const log: Log = {
    level: LogLevel.Error,
    createdDate: firebase.firestore.FieldValue.serverTimestamp(),
    message,
    userUId
  };

  usersCollection.add(log);
};

export const tryCreateAuthAssociatedUser = async (user: firebase.User) => {
  const firestore = firebase.firestore();
  const usersCollection = firestore.collection("users");
  const currentUserInDb = await usersCollection.doc(user.uid).get();

  if (!currentUserInDb?.exists) {
    const userDocument: User = {
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      favoriteGenres: [],
      favoriteTracks: [],
      favoriteAlbums: []
    };
    usersCollection.doc(user.uid).set(userDocument);
  }
};

export const tryUpdateUserFavoriteGenres = async (
  user: firebase.User,
  favoriteGenres: Genre[]
) => {
  const firestore = firebase.firestore();
  const usersCollection = firestore.collection("users");

  try {
    usersCollection.doc(user.uid).update({
      favoriteGenres: favoriteGenres.map<GenreDto>(genre => ({
        id: genre.id,
        name: genre.name
      }))
    });
  } catch (exception) {
    logError(exception?.message, user.uid);
  }
};

export const tryUpdateUserFavoriteAlbums = async (
  user: firebase.User,
  favoriteAlbums: AlbumDto[]
) => {
  const firestore = firebase.firestore();
  const usersCollection = firestore.collection("users");

  try {
    usersCollection.doc(user.uid).update({
      favoriteAlbums: favoriteAlbums
    });
  } catch (exception) {
    logError(exception?.message, user.uid);
  }
};

export const tryUpdateUserFavoriteTracks = async (
  user: firebase.User,
  favoriteTracks: TrackDto[]
) => {
  const firestore = firebase.firestore();
  const usersCollection = firestore.collection("users");

  try {
    usersCollection.doc(user.uid).update({
      favoriteTracks: favoriteTracks
    });
  } catch (exception) {
    logError(exception?.message, user.uid);
  }
};

export const getUserDocumentByUid = (uid: string) => {
  const firestore = firebase.firestore();

  return firestore.collection("users").doc(uid);
};
