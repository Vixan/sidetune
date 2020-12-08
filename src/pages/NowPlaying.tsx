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
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getTrack } from "../api/tracksApiService";
import { AudioPlayerSeekSlider } from "../components/AudioPlayerSeekSlider";
import { AudioPlayerVolumeSlider } from "../components/AudioPlayerVolumeSlider";
import { Button } from "../components/Button";
import { useAudioContext } from "../contexts/AudioContext";
import { Track } from "../models/Track";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";
import { formatSecondsToHms } from "../utils/formatting";

interface NavigationParams {
  trackId: string;
}

export const NowPlaying: FC<{}> = () => {
  const { trackId } = useParams<NavigationParams>();
  const history = useHistory();

  const { setAudioSource, audioState, audioControls } = useAudioContext();
  const [isTransitioning, setTransitioning] = useState(false);

  const playTrack = (data: Track) => {
    setAudioSource(data.preview);
    audioControls.seek(0);
    audioControls.play();
  };

  const { data, isLoading } = useQuery<Track>(
    ["track", trackId],
    async () => getTrack(parseInt(trackId)),
    {
      staleTime: MAX_CACHE_STALE_TIME,
      onSuccess: playTrack
    }
  );

  useEffect(() => {
    setTransitioning(true);
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
        <Button
          className="p-2 hover:bg-gray-700"
          onClick={() => history.goBack()}>
          <ChevronLeft />
        </Button>
        <Button className="p-2 ml-auto hover:bg-gray-700">
          <Heart />
        </Button>
      </div>

      {isLoading && <>Loading</>}

      {data && audioState.time && (
        <>
          <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-4">
            {audioState.duration && (
              <AudioPlayerSeekSlider
                audioControls={audioControls}
                currentTime={audioState.time}
                duration={audioState.duration}
                coverImageUrl={data?.album.cover_big}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-8">
            <span className="mb-4 text-xs text-gray-600">
              {formatSecondsToHms(audioState.time)} /{" "}
              {formatSecondsToHms(audioState.duration)}
            </span>
            <p className="text-xl font-bold text-center text-teal-500">
              {data.title}
            </p>
            <p className="mb-2 text-sm">{data.artist.name}</p>
            <p className="text-xs text-gray-600">
              {data.album.title},{" "}
              {new Date(data.album.release_date).getFullYear()}
            </p>
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
        </>
      )}
    </div>
  );
};
