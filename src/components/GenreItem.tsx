import React, { ChangeEvent, FC } from "react";
import { Genre } from "../models/Genre";
import { Checkbox } from "./Checkbox";

interface GenreItemProps {
  genre: Genre;
  isSelected: boolean;
  onChange: (checked: boolean) => void;
}

export const GenreItem: FC<GenreItemProps> = ({
  genre: { name, picture_medium },
  isSelected,
  onChange
}) => {
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div
      className="text-xs text-left cursor-pointer hover:opacity-75"
      onClick={() => onChange(!isSelected)}>
      <div className="relative flex-row space-y-3">
        <img
          src={picture_medium}
          alt={`${name} cover`}
          className={`object-cover object-center w-full h-24 rounded-lg pointer-events-none select-none border-2 border-transparent ${
            isSelected ? "border-teal-500" : ""
          }`}
        />
        {isSelected && (
          <Checkbox
            checked={isSelected}
            onChange={onValueChange}
            className="absolute top-0 ml-3"
          />
        )}
        <div className="w-full space-y-1 overflow-hidden text-center text-white whitespace-no-wrap">
          <p className="text-gray-600 truncate">{name}</p>
        </div>
      </div>
    </div>
  );
};
