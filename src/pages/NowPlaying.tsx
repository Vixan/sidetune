import React, { FC, useEffect, useRef, useState } from "react";
import {
  AlignLeft,
  ChevronLeft,
  Heart,
  Meh,
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
import { useClickAway, useLocation } from "react-use";
import { getAlbumPlaylist } from "../api/albumsApiService";
import { getLyrics } from "../api/lyricsApiService";
import { getTrack } from "../api/tracksApiService";
import { AudioPlayerSeekSlider } from "../components/AudioPlayerSeekSlider";
import { AudioPlayerVolumeSlider } from "../components/AudioPlayerVolumeSlider";
import { Button } from "../components/Button";
import { UnexpectedErrorMessage } from "../components/UnexpectedErrorMessage";
import { useAudioContext } from "../contexts/AudioContext";
import { usePlaybackContext } from "../contexts/PlaybackContext";
import { Album } from "../models/Album";
import { Track } from "../models/Track";
import { MAX_CACHE_STALE_TIME } from "../utils/caching";
import { formatSecondsToHms } from "../utils/formatting";
import { getShuffledArray } from "../utils/randomUtils";
import { useLocationQueryString } from "../utils/routerUtils";

interface NavigationParams {
  albumId: string;
  trackId: string;
}

const Skeleton = () => (
  <div className="flex flex-col items-center justify-center mb-4 space-y-8 animate-pulse">
    <div className="w-48 h-48 bg-gray-600 rounded-lg"></div>
    <div className="flex flex-col items-center w-full space-y-4">
      <div className="w-2/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-2/4 h-4 bg-gray-600 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
    </div>
    <div className="w-full h-10 bg-gray-600 rounded"></div>
  </div>
);

export const NowPlaying: FC<{}> = () => {
  const { albumId, trackId } = useParams<NavigationParams>();
  const querySearchParams = useLocationQueryString();
  const history = useHistory();

  const { setAudioSource, audioState, audioControls } = useAudioContext();
  const [isTransitioning, setTransitioning] = useState(false);
  const [isLyricsPaneOpened, setLyricsPaneOpened] = useState(false);

  const {
    data: album,
    isLoading: isAlbumLoading,
    isError: isAlbumError
  } = useQuery<Album>(
    ["albumPlaylist", albumId],
    async () => await getAlbumPlaylist(parseInt(albumId)),
    {
      staleTime: MAX_CACHE_STALE_TIME
    }
  );
  const { setTracks } = usePlaybackContext();

  const { setCurrentTrackId, nextTrack, previousTrack } = usePlaybackContext();

  const ref = useRef(null);
  useClickAway(ref, () => {
    setLyricsPaneOpened(false);
  });

  const { data: track, isLoading, isError, error } = useQuery<Track>(
    ["track", trackId],
    async () => getTrack(parseInt(trackId)),
    {
      staleTime: MAX_CACHE_STALE_TIME
    }
  );

  const { data: lyrics } = useQuery<string>(
    ["lyrics", trackId],
    async () => getLyrics(track?.artist.name || "", track?.title || ""),
    {
      enabled: track,
      staleTime: 2 * MAX_CACHE_STALE_TIME
    }
  );

  const setAlbumQueue = () => {
    if (album?.tracks?.data) {
      const shuffleAlbum = querySearchParams.get("shuffle");

      const albumQueue = shuffleAlbum
        ? getShuffledArray(album.tracks.data)
        : album.tracks.data;

      const queueTracks = albumQueue.map((track, i) => ({
        id: track.id,
        title: track.title,
        url: track.preview,
        order: i
      }));

      setTracks(queueTracks);
    }
  };

  useEffect(() => {
    setTransitioning(true);

    audioControls.volume(0.5);
  }, []);

  useEffect(() => {
    setAlbumQueue();
  }, [album]);

  useEffect(() => {
    if (track) {
      setCurrentTrackId(track.id);
      setAudioSource(track.preview);

      audioControls.seek(0);
      audioControls.play();
    }
  }, [track]);

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

  const onPlayNextTrack = () => {
    if (track && nextTrack?.id) {
      history.replace({ pathname: `${nextTrack.id}` });
    }
  };

  const onPlayPreviousTrack = () => {
    if (track && previousTrack?.id) {
      history.replace(`${previousTrack.id}`);
    }
  };

  return (
    <div
      className={`transition-all duration-500
      ${
        isTransitioning
          ? "ease-in-out transform translate-x-0 opacity-100"
          : "transform translate-x-32 opacity-0 h-full"
      }
    `}>
      <div className="flex mb-4">
        <Button
          className="p-2 hover:bg-gray-700"
          onClick={() => history.goBack()}>
          <ChevronLeft />
        </Button>
        <div className="ml-auto">
          <Button className="p-2 hover:bg-gray-700">
            <AlignLeft onClick={() => setLyricsPaneOpened(true)} />
          </Button>
          <Button className="p-2 hover:bg-gray-700">
            <Heart />
          </Button>
        </div>
      </div>

      {(isAlbumLoading || isLoading) && <Skeleton />}

      {(isError || isAlbumError) && (
        <UnexpectedErrorMessage description={error as string} />
      )}

      <div
        ref={ref}
        className={`absolute text-center bottom-0 z-10 w-full h-0 bg-gray-800 text-sm text-gray-500 transition-all duration-500 ${
          isLyricsPaneOpened ? "h-full p-4" : "h-0"
        }`}>
        {isLyricsPaneOpened ? (
          <>
            {lyrics ? (
              <span className="whitespace-pre-wrap">{lyrics}</span>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Meh />
                <p>No lyrics found for this track</p>
              </div>
            )}
          </>
        ) : null}
      </div>

      {track && audioState.time > 0 && (
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center justify-center max-w-xs pl-12 pr-12 mb-4">
            {audioState.duration && (
              <AudioPlayerSeekSlider
                audioControls={audioControls}
                currentTime={audioState.time}
                duration={audioState.duration}
                coverImageUrl={track?.album.cover_big}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center pl-12 pr-12 mb-8">
            <span className="mb-4 text-xs text-gray-600">
              {formatSecondsToHms(audioState.time)} /{" "}
              {formatSecondsToHms(audioState.duration)}
            </span>
            <p className="text-xl font-bold text-center text-teal-500">
              {track.title}
            </p>
            <p className="mb-2 text-sm">{track.artist.name}</p>
            <p className="text-xs text-center text-gray-600">
              {track.album.title},{" "}
              {new Date(track.album.release_date).getFullYear()}
            </p>
          </div>

          <div className="flex items-center justify-center mb-6 ml-4 mr-4 space-x-2">
            <Button disabled>
              <Shuffle size={16} className="fill-current" />
            </Button>
            <Button
              className="p-4 hover:bg-gray-700"
              disabled={!previousTrack}
              onClick={onPlayPreviousTrack}>
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
            <Button
              className="p-4 bg-gray-800 hover:bg-gray-700"
              disabled={!nextTrack}
              onClick={onPlayNextTrack}>
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
      )}
    </div>
  );
};
