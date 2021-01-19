import firebase from "firebase/app";
import "firebase/firestore";
import { Genre } from "../models/Genre";
import { Log, LogLevel } from "../models/Log";
import { User } from "../models/User";
import { UserFavoriteGenre } from "../models/UserFavoriteGenre";

const firestore = firebase.firestore();

const logError = (message: string, userUId?: string) => {
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
  const usersCollection = firestore.collection("users");
  const currentUserInDb = await usersCollection.doc(user.uid).get();

  if (!currentUserInDb?.exists) {
    const userDocument: User = {
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      favoriteGenres: []
    };
    usersCollection.doc(user.uid).set(userDocument);
  }
};

export const trySetUserFavoriteGenres = async (
  user: firebase.User,
  favoriteGenres: Genre[]
) => {
  const usersCollection = firestore.collection("users");

  try {
    usersCollection.doc(user.uid).update({
      favoriteGenres: favoriteGenres.map<UserFavoriteGenre>(genre => ({
        id: genre.id,
        name: genre.name
      }))
    });
  } catch (exception) {
    console.log(exception);
    logError(exception?.message, user.uid);
  }
};

export const getUserDocumentByUid = (uid: string) => {
  return firestore.collection("users").doc(uid);
};
