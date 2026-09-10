import React from "react";
import "./Button.css";

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <button
      className={`button button--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
