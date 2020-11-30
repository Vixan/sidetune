import React, { FC, useContext, useEffect, useState } from "react";
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
import CircularSlider from "@fseehawer/react-circular-slider";
import { formatSecondsToHms } from "../utils/formatting";
import { AudioPlayerButton } from "../components/AudioPlayerButton";

export const NowPlaying: FC<{}> = () => {
  const { setAudioSource, audioState, audioControls } = useContext(
    AudioContext
  );
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);

    setAudioSource("https://1.mp3-download.best/stream/-hhg1uH:RKTbR");
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
        <AudioPlayerButton icon={<Heart />} className="ml-auto" />
      </div>

      <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4">
        {audioState.duration && (
          <CircularSlider
            min={0}
            max={audioState.duration}
            dataIndex={audioState.time}
            className="w-full h-full"
            width="250"
            progressColorFrom="#00bfbd"
            progressColorTo="#009c9a"
            knobColor="#38b2ac"
            knobSize="24"
            trackColor="#4a5568"
            renderLabelValue={
              <img
                src="https://pbs.twimg.com/profile_images/1059529111725576192/wld30wi5.jpg"
                alt="Cover"
                className="absolute top-0 object-cover p-5 bg-center rounded-full shadow-lg"
              />
            }
            onChange={(value: number) => {
              // FIXME: Investigate how to fix the stuttering issue
              // audioControls.seek(value);
            }}>
            <></>
          </CircularSlider>
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

      <div className="flex items-center justify-center mb-8 ml-4 mr-4 space-x-2">
        <AudioPlayerButton
          icon={<Shuffle size={16} className="fill-current" />}
          disabled
        />
        <AudioPlayerButton
          icon={<SkipBack className="fill-current" />}
          className="p-4 bg-gray-800 hover:bg-gray-700"
        />
        <AudioPlayerButton
          icon={
            audioState.paused ? (
              <Play size={36} className="text-gray-800 fill-current" />
            ) : (
              <Pause size={36} className="text-gray-800 fill-current" />
            )
          }
          className="p-4 bg-teal-500 shadow-lg hover:bg-teal-300"
          onClick={togglePlayState}
        />
        <AudioPlayerButton
          icon={<SkipForward className="fill-current" />}
          className="p-4 bg-gray-800 hover:bg-gray-700"
        />
        <AudioPlayerButton
          icon={<Repeat size={16} className="fill-current" />}
          disabled
        />
      </div>

      <div className="flex items-center space-x-2">
        <AudioPlayerButton
          icon={<Volume1 />}
          onClick={() => setVolume(audioState.volume - 0.1)}
        />
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
                  state.index === 1
                    ? "bg-transparent"
                    : "bg-teal-500 hover:bg-teal-300"
                }`}></div>
            )}
          />
        </div>
        <AudioPlayerButton
          icon={<Volume2 />}
          onClick={() => setVolume(audioState.volume + 0.1)}
        />
      </div>
    </div>
  );
};
