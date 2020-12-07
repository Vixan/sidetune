import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ className, children, ...props }) => {
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
      {children}
    </button>
  );
};
