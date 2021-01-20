import React, { FC } from "react";
import ReactSlider from "react-slider";

interface KeyValuePair<T> {
  [key: string]: T;
}

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const AudioPlayerVolumeSlider: FC<Props> = ({
  value,
  onChange
}) => {
  return (
    <ReactSlider
      min={0}
      max={1}
      step={0.01}
      className="w-full h-2 align-middle bg-gray-700 rounded-full"
      thumbClassName="bg-teal-500 hover:bg-teal-300 rounded-full -mt-1 h-4 w-4 cursor-grab shadow-lg"
      value={value}
      onChange={value => onChange(value as number)}
      renderTrack={(props: KeyValuePair<any>, state) => (
        <div
          {...props}
          className={`rounded-full shadow-sm mt-0 mb-0 h-2 ${
            state.index === 1
              ? "bg-transparent"
              : "bg-teal-500 hover:bg-teal-300"
          }`}></div>
      )}
    />
  );
};
