import React, { JSX } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  btnColor?: "primary" | "gray";
  type?: "button" | "submit";
  children?: JSX.Element[] | JSX.Element | string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  btnColor = "primary",
  type = "button",
  children,
  ...rest
}: ButtonProps) => {
  const buttonColorStyle = () => {
    switch (btnColor) {
      case "primary":
        return "border-var-primary-300 text-var-primary-300";
      case "gray":
        return "border-black/50 text-black/50";
      default:
        return "";
    }
  };

  return (
    <button
      {...rest}
      type={type}
      className={twMerge(
        `flex shrink-0 justify-between items-center gap-2 px-4 py-2 border-2 rounded-lg text-xl font-semibold ${buttonColorStyle()}`,
        rest.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
