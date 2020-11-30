import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

export interface AudioPlayerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  padding?: number;
  backgroundColor?: string;
}

export const AudioPlayerButton: FC<AudioPlayerButtonProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "inline-flex",
        "items-center",
        "disabled:bg-transparent",
        "disabled:opacity-25",
        "disabled:cursor-not-allowed",
        "rounded-full"
      )}>
      {icon}
    </button>
  );
};
