import React, { createContext, FC, PropsWithChildren, useState } from "react";
import { useAudio } from "react-use";

export interface AudioContextProps {
  currentSong: string;
  playSong: (song: string) => void;
  isPaused: boolean;
  time: number;
}

export const AudioContext = createContext<AudioContextProps>({
  currentSong: "",
  playSong: () => "",
  isPaused: false,
  time: 0
});

export const AudioProvider: FC = ({ children }: PropsWithChildren<{}>) => {
  const [currentSong, setSong] = useState<string>(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  );
  const [audio, state, controls, ref] = useAudio({
    src: currentSong,
    autoPlay: true
  });

  const playSong = (songSrc: string) => {
    setSong(songSrc);
    if (ref.current) {
      ref.current.src = songSrc;
      controls.play();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        playSong,
        isPaused: state.paused,
        time: state.time
      }}>
      {audio}
      {children}
    </AudioContext.Provider>
  );
};
