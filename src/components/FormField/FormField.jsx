import React from "react";
import "./FormField.css";

export default function FormField({ label, children, full = false }) {
  return (
    <label className={`form-field ${full ? "form-field--full" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}
