import React from "react";
import { MusicPlayer } from "./MusicPlayer";

export const App: React.FC<{}> = () => {
  return (
    <div
      className="h-screen bg-gradient-to-r from-teal-400 to-blue-700 
    flex justify-center content-center flex-wrap"
    >
      <div
        className="bg-gray-800 rounded-xl text-white p-4 shadow-2xl"
        style={{ width: 375, maxHeight: 650 }}
      >
        <MusicPlayer />
      </div>
    </div>
  );
};
