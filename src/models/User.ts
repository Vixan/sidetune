import firebase from "firebase/app";
import "firebase/firestore";

export interface User {
  createdDate: firebase.firestore.FieldValue;
}
