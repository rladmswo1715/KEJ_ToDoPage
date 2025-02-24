import React, { JSX } from "react";

type ButtonProps = {
  btnColor?: "primary" | "gray";
  children?: JSX.Element[] | JSX.Element | string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ btnColor = "primary", children, ...rest }: ButtonProps) => {
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
      className={`flex justify-between items-center gap-2 px-4 py-2 border-2 rounded-lg text-xl font-semibold ${buttonColorStyle()} ${
        rest.className
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
