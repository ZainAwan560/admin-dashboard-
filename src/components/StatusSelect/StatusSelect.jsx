import React from "react";
import "./StatusSelect.css";

const statuses = [
  "Pending",
  "Processing",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

export default function StatusSelect({ value, onChange }) {
  return (
    <select
      className={`status-select status-select--${value.toLowerCase()}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {statuses.map((status) => (
        <option key={status}>{status}</option>
      ))}
    </select>
  );
}
