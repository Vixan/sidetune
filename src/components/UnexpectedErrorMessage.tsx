import React, { FC } from "react";
import { AlertCircle } from "react-feather";

interface Props {
  description: string;
}

export const UnexpectedErrorMessage: FC<Props> = ({ description }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2 text-center text-red-600 align-middle">
      <AlertCircle size={48} />
      <p className="text-lg font-bold">An unexpected error has occured</p>
      <span className="text-sm">{description}</span>
    </div>
  );
};
