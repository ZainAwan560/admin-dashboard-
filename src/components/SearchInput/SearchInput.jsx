import React from "react";
import "./SearchInput.css";

export default function SearchInput({
  children,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="search-input">
      <span>{children}</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
