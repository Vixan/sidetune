import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

export const AudioPlayerButton: FC<Props> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "inline-flex",
        "items-center",
        "disabled:bg-transparent",
        "disabled:opacity-25",
        "disabled:cursor-not-allowed",
        "rounded-full",
        className
      )}>
      {icon}
    </button>
  );
};
