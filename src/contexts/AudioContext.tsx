import React, { createContext, FC, PropsWithChildren, useState } from "react";
import { useAudio } from "react-use";

export interface AudioContextProps {
  currentAudioSource: string;
  playAudio: (song: string) => void;
  isAudioPaused: boolean;
  currentAudioTime: number;
  totalAudioDuration: number
}

export const AudioContext = createContext<AudioContextProps>({
  currentAudioSource: "",
  playAudio: () => "",
  isAudioPaused: false,
  currentAudioTime: 0,
  totalAudioDuration: 0
});

export const AudioProvider: FC = ({ children }: PropsWithChildren<{}>) => {
  const [currentAudioSource, setAudioSource] = useState<string>(
    "https://1.mp3-download.best/stream/-hYEGvH:hmTgP"
  );
  const [audio, state, controls, ref] = useAudio({
    src: currentAudioSource,
    autoPlay: true
  });

  const playAudio = (songSrc: string) => {
    setAudioSource(songSrc);
    if (ref.current) {
      ref.current.src = songSrc;
      controls.play();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudioSource,
        playAudio,
        isAudioPaused: state.paused,
        currentAudioTime: state.time,
        totalAudioDuration: state.duration
      }}>
      {audio}
      {children}
    </AudioContext.Provider>
  );
};
