import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { useAudio } from "react-use";
import {
  HTMLMediaControls,
  HTMLMediaState
} from "react-use/lib/util/createHTMLMediaHook";

export interface AudioContextProps {
  currentAudioSource?: string;
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
  const [audio, state, controls, ref] = useAudio({
    src: "",
    autoPlay: false
  });

  const setAudioSource = (url: string) => {
    if (ref.current) {
      ref.current.src = url;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudioSource: ref.current?.src,
        setAudioSource,
        audioState: state,
        audioControls: controls
      }}>
      {audio}
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
