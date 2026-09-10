import React from "react";
import "./CustomerAvatar.css";

export default function CustomerAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return <span className="customer-avatar">{initials}</span>;
}
