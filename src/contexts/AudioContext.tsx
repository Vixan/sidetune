import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState
} from "react";
import { useAudio } from "react-use";
import {
  HTMLMediaControls,
  HTMLMediaState
} from "react-use/lib/util/createHTMLMediaHook";

export interface AudioContextProps {
  currentAudioSource: string;
  setAudioSource: (src: string) => void;
  audioState: HTMLMediaState;
  audioControls: HTMLMediaControls;
}

export const AudioContext = createContext<AudioContextProps>({
  currentAudioSource: "",
  setAudioSource: (_: string) => {},
  audioState: {
    buffered: [],
    duration: 0,
    muted: false,
    paused: false,
    time: 0,
    volume: 0.5
  },
  audioControls: {
    mute: () => {},
    pause: () => {},
    play: () => {},
    seek: () => {},
    unmute: () => {},
    volume: () => {}
  }
});

export const AudioProvider: FC = ({ children }: PropsWithChildren<{}>) => {
  const [currentAudioSource, setAudioSource] = useState<string>(
    "https://1.mp3-download.best/stream/-hYEGvH:hmTgP"
  );
  const [audio, state, controls] = useAudio({
    src: currentAudioSource,
    autoPlay: false
  });

  return (
    <AudioContext.Provider
      value={{
        currentAudioSource,
        setAudioSource: src => setAudioSource(src),
        audioState: state,
        audioControls: controls
      }}>
      {audio}
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
