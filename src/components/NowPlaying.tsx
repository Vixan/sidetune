import React, { FC, useContext, useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import {
  ChevronLeft,
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2
} from "react-feather";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import { AudioContext } from "../contexts/AudioContext";

const formatSecondsToHms = (seconds: number) => {
  const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
  const minutes = (seconds % 3600) / 60;

  return [minutes, seconds % 60].map(format).join(":");
};

export const NowPlaying: FC<{}> = () => {
  const { setAudioSource, audioState, audioControls } = useContext(
    AudioContext
  );
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);

    setAudioSource("https://1.mp3-download.best/stream/-hYEGvH:hmTgP");
    audioControls.play();
  }, []);

  const togglePlayState = () => {
    if (audioState.paused) {
      audioControls.play();
    } else {
      audioControls.pause();
    }
  };

  const setVolume = (volume: number) => {
    audioControls.volume(volume);
  };

  console.log("MusicPlayer render");

  return (
    <div
      className={`transition-all duration-500
      ${
        isTransitioning
          ? "ease-in-out transform translate-x-0 opacity-100"
          : "transform translate-x-32 opacity-0"
      }
    `}>
      <div className="flex mb-4">
        <Link
          to="/"
          className="inline-flex items-center p-2 rounded-full hover:bg-gray-700">
          <ChevronLeft />
        </Link>
        <button className="inline-flex items-center p-2 ml-auto text-teal-500 rounded-full hover:bg-gray-700">
          <Heart />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4">
        <CircularProgressbarWithChildren
          className="w-full h-full"
          value={(audioState.time * 100) / audioState.duration}
          strokeWidth={4}
          styles={buildStyles({
            pathColor: "#38b2ac",
            trailColor: "#4a5568",
            pathTransitionDuration: 0.1,
            strokeLinecap: "round"
          })}>
          <img
            src="https://pbs.twimg.com/profile_images/1059529111725576192/wld30wi5.jpg"
            alt="Cover"
            className="object-cover p-4 bg-center rounded-full shadow-lg"
          />
        </CircularProgressbarWithChildren>
      </div>

      <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-8">
        <span className="mb-4 text-xs text-gray-600">
          {formatSecondsToHms(audioState.time)} /{" "}
          {formatSecondsToHms(audioState.duration)}
        </span>
        <h1 className="text-xl font-bold text-center text-teal-500">Droplet</h1>
        <h2 className="mb-2 text-sm">Kupla</h2>
        <p className="text-xs text-gray-600">Coniferous, 2019</p>
      </div>

      <div className="flex items-center justify-center mb-8 ml-4 mr-4 space-x-2">
        <button
          className="inline-flex items-center p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:bg-transparent disabled:opacity-25 disabled:cursor-not-allowed"
          disabled>
          <Shuffle size={16} className="fill-current" />
        </button>
        <button className="inline-flex items-center p-4 rounded-full hover:bg-gray-700">
          <SkipBack className="fill-current" />
        </button>
        <button
          className="inline-flex items-center h-auto p-4 bg-teal-500 rounded-full shadow-lg hover:bg-teal-300"
          onClick={togglePlayState}>
          {audioState.paused ? (
            <Play size={36} className="text-gray-800 fill-current" />
          ) : (
            <Pause size={36} className="text-gray-800 fill-current" />
          )}
        </button>
        <button className="inline-flex items-center p-4 rounded-full hover:bg-gray-700">
          <SkipForward className="fill-current" />
        </button>
        <button
          className="inline-flex items-center p-2 rounded-full hover:bg-gray-700 disabled:bg-transparent disabled:opacity-25 disabled:cursor-not-allowed"
          disabled>
          <Repeat size={16} className="fill-current" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
          onClick={() => setVolume(audioState.volume - 0.1)}>
          <Volume1 />
        </button>
        <div className="flex-grow h-2">
          <ReactSlider
            min={0}
            max={1}
            step={0.01}
            className="w-full h-2 align-middle bg-gray-700 rounded-full"
            thumbClassName="bg-teal-500 hover:bg-teal-300 rounded-full -mt-1 h-4 w-4 cursor-grab shadow-lg transition-all duration-200"
            value={audioState.volume}
            onChange={value => setVolume(value as number)}
            renderTrack={(props: { [key: string]: any }, state) => (
              <div
                {...props}
                className={`rounded-full shadow-sm mt-0 mb-0 h-2 transition-all duration-200 ${
                  state.index === 1 ? "bg-transparent" : "bg-teal-500 hover:bg-teal-300"
                }`}></div>
            )}
          />
        </div>
        <button
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
          onClick={() => setVolume(audioState.volume + 0.1)}>
          <Volume2 />
        </button>
      </div>
    </div>
  );
};
