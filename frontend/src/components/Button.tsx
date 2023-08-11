import React from "react";

interface Props {
  children?: string;
  type?: string;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "dark"
    | "light";
  onClick: () => void;
}

const Button = ({
  children,
  type = "btn",
  color = "primary",
  onClick,
}: Props) => {
  return (
    <button type="button" className={type + " btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
