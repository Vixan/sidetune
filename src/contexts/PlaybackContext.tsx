import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState
} from "react";
import { QueueTrack } from "../models/QueueTrack";

export interface PlaybackContextProps {
  tracks: QueueTrack[];
  setTracks: (tracks: QueueTrack[]) => void;
  currentTrackId: number | undefined;
  setCurrentTrackId: (trackId: number) => void;
  previousTrack: QueueTrack | undefined;
  nextTrack: QueueTrack | undefined;
}

export const PlaybackContext = createContext<PlaybackContextProps>({
  tracks: [],
  setTracks: () => {},
  currentTrackId: undefined,
  setCurrentTrackId: () => {},
  previousTrack: undefined,
  nextTrack: undefined
});

export const PlaybackProvider: FC = ({ children }: PropsWithChildren<{}>) => {
  const [tracks, setTracks] = useState<QueueTrack[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState<number>();

  const currentTrackIndex = tracks.findIndex(
    track => track.id === currentTrackId
  );
  const previousTrack = tracks[currentTrackIndex - 1];
  const nextTrack = tracks[currentTrackIndex + 1];

  return (
    <PlaybackContext.Provider
      value={{
        tracks,
        setTracks,
        currentTrackId,
        setCurrentTrackId,
        previousTrack,
        nextTrack
      }}>
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlaybackContext = () => useContext(PlaybackContext);
