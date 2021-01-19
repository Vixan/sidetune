import React, { FC, HTMLAttributes } from "react";

interface CheckboxProps {
  checked: boolean;
  label?: string;
}

export const Checkbox: FC<CheckboxProps & HTMLAttributes<HTMLInputElement>> = ({
  checked = false,
  onChange,
  label = null,
  ...className
}) => {
  return (
    <div {...className}>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="w-5 h-5 text-teal-500 rounded form-checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label && <span className="ml-2 text-gray-700">label</span>}
      </label>
    </div>
  );
};
