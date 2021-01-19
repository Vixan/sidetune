import firebase from "firebase/app";
import "firebase/firestore";
import { Genre } from "./Genre";

export interface User {
  createdDate: firebase.firestore.FieldValue;
  favoriteGenres: Genre[];
}
