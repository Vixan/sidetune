import React, { FC, MouseEvent, useRef } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import useEventListener from "../hooks/useEventListener";
import { HTMLMediaControls } from "react-use/lib/util/createHTMLMediaHook";

interface Props {
  audioControls: HTMLMediaControls;
  currentTime: number;
  duration: number;
  coverImageUrl?: string;
}

export const AudioPlayerSeekSlider: FC<Props> = ({
  audioControls,
  currentTime,
  duration,
  coverImageUrl
}) => {
  const seekRef = useRef(0);
  const dragRef = useRef(false);
  const downRef = useRef(false);

  const onMouseDown = (ev: MouseEvent) => {
    // Ignore the mouse event for all HTML elements, except the <circle> element, 
    // because it is the target of the click on the slider thumb.
    if (ev.target instanceof SVGCircleElement) {
      downRef.current = true;
      audioControls.pause();
    }
  };

  const onMouseMove = () => {
    if (downRef.current) {
      dragRef.current = true;
    }
  };

  const onMouseUp = () => {
    downRef.current = false;

    if (dragRef.current) {
      audioControls.seek(seekRef.current);
      audioControls.play();
      dragRef.current = false;
    }
  };

  const seek = (value: number) => {
    seekRef.current = value;
  };

  useEventListener("mousemove", onMouseMove);
  useEventListener("mouseup", onMouseUp);

  return (
    <div onMouseDown={onMouseDown}>
      <CircularSlider
        min={0}
        max={duration}
        dataIndex={currentTime}
        className="w-full h-full"
        width="220"
        progressColorFrom="#00bfbd"
        progressColorTo="#009c9a"
        knobColor="#38b2ac"
        knobSize="24"
        trackColor="#4a5568"
        renderLabelValue={
          <img
            src={coverImageUrl}
            alt="Cover"
            className="absolute top-0 object-cover p-5 bg-center rounded-full shadow-lg"
          />
        }
        onChange={seek}>
        <></>
      </CircularSlider>
    </div>
  );
};
