import React from "react";
import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  const statusClass = status
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <span className={`status-badge status-badge--${statusClass}`}>
      {status}
    </span>
  );
}
