import React, { FC, useContext, useEffect, useState } from "react";
import {
  ChevronLeft,
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward
} from "react-feather";

import ReactSlider from "react-slider";
import { Link } from "react-router-dom";

import { AudioContext } from "../contexts/AudioContext";

export const NowPlaying: FC<{}> = () => {
  const { currentSong, playSong, isPaused, time } = useContext(AudioContext);

  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    playSong("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3");
  }, []);

  console.log("MusicPlayer render");

  return (
    <>
      <div className="flex mb-8">
        <Link
          to="/"
          className="hover:bg-gray-700 p-2 rounded-full inline-flex items-center">
          <ChevronLeft />
        </Link>
        <button className="ml-auto hover:bg-gray-700 p-2 rounded-full inline-flex items-center text-teal-500">
          <Heart />
        </button>
      </div>

      <div className="flex items-center justify-center flex-col mb-8">
        <img
          src="https://dummyimage.com/600x600"
          alt="Cover"
          className="object-cover bg-center h-40 w-40 rounded-full mb-8 shadow-lg"
        />
        <h1 className="text-xl font-bold text-teal-500">
          Dummy song about something
        </h1>
        <h2 className="text-sm mb-4">Album of the dummy</h2>
        <p className="text-xs text-gray-600">18 April 2020</p>
      </div>

      <div className="flex mb-8 ml-4 mr-4 justify-center items-center space-x-2">
        <button className="hover:bg-gray-700 p-2 rounded-full inline-flex items-center">
          <Shuffle size={16} className="fill-current" />
        </button>
        <button className="hover:bg-gray-700 p-4 rounded-full inline-flex items-center">
          <SkipBack className="fill-current" />
        </button>
        <button className="bg-teal-500 hover:bg-teal-300 h-auto p-4 rounded-full inline-flex items-center shadow-lg">
          {isPaused ? (
            <Play size={36} className="text-gray-800 fill-current" />
          ) : (
            <Pause size={36} className="text-gray-800 fill-current" />
          )}
        </button>
        <button className="hover:bg-gray-700 p-4 rounded-full inline-flex items-center">
          <SkipForward className="fill-current" />
        </button>
        <button className="hover:bg-gray-700 p-2 rounded-full inline-flex items-center">
          <Repeat size={16} className="fill-current" />
        </button>
      </div>

      <div className="flex mb-8 ml-4 mr-4">
        <ReactSlider
          min={0}
          max={100}
          step={1}
          className="bg-gray-700 h-2 w-full rounded-full"
          thumbClassName="bg-teal-500 hover:bg-teal-300 rounded-full -mt-1 h-4 w-4 cursor-grab shadow-lg"
          value={volume}
          onChange={value => setVolume(value as number)}
          renderTrack={(props: { [key: string]: any }, state) => (
            <div
              {...props}
              className={`rounded-full shadow-sm mt-0 mb-0 h-2 ${
                state.index === 1 ? "bg-transparent" : "bg-teal-500"
              }`}></div>
          )}
        />
      </div>
    </>
  );
};
