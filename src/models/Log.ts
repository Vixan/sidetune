import firebase from "firebase/app";
import "firebase/firestore";

export enum LogLevel {
  Information = "Information",
  Error = "Error"
}

export interface Log {
  level: LogLevel;
  createdDate: firebase.firestore.FieldValue;
  message: string;
  userUId?: string;
}
