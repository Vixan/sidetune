import React, { FC, useEffect, useState } from "react";
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
import { formatSecondsToHms } from "../utils/formatting";
import { AudioPlayerVolumeSlider } from "../components/AudioPlayerVolumeSlider";
import { AudioPlayerSeekSlider } from "../components/AudioPlayerSeekSlider";
import { useAudioContext } from "../contexts/AudioContext";
import { Button } from "../components/Button";

export const NowPlaying: FC<{}> = () => {
  const { setAudioSource, audioState, audioControls } = useAudioContext();
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);

    setAudioSource("https://1.mp3-download.best/stream/-hYEGvH:hmTgP");
    audioControls.seek(0);
    // audioControls.play();
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

  const increaseVolume = () => {
    setVolume(audioState.volume + 0.1);
  };

  const decreaseVolume = () => {
    setVolume(audioState.volume - 0.1);
  };

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
        <Button className="p-2 ml-auto hover:bg-gray-700">
          <Heart />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4">
        {audioState.duration && (
          <AudioPlayerSeekSlider
            audioControls={audioControls}
            currentTime={audioState.time}
            duration={audioState.duration}
            coverImageUrl={
              "https://pbs.twimg.com/profile_images/1059529111725576192/wld30wi5.jpg"
            }
          />
        )}
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

      <div className="flex items-center justify-center mb-6 ml-4 mr-4 space-x-2">
        <Button disabled>
          <Shuffle size={16} className="fill-current" />
        </Button>
        <Button className="p-4 hover:bg-gray-700">
          <SkipBack className="fill-current" />
        </Button>
        <Button
          className="p-4 bg-teal-500 shadow-lg hover:bg-teal-300"
          onClick={togglePlayState}>
          {audioState.paused ? (
            <Play size={36} className="text-gray-800 fill-current" />
          ) : (
            <Pause size={36} className="text-gray-800 fill-current" />
          )}
        </Button>
        <Button className="p-4 bg-gray-800 hover:bg-gray-700">
          <SkipForward className="fill-current" />
        </Button>
        <Button disabled>
          <Repeat size={16} className="fill-current" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={decreaseVolume} className="p-2 hover:bg-gray-700">
          <Volume1 />
        </Button>
        <div className="flex-grow h-2">
          <AudioPlayerVolumeSlider
            value={audioState.volume}
            onChange={setVolume}
          />
        </div>
        <Button onClick={increaseVolume} className="p-2 hover:bg-gray-700">
          <Volume2 />
        </Button>
      </div>
    </div>
  );
};
