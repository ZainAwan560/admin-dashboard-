import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import "./TableToolbar.css";

export default function TableToolbar({
  placeholder,
  value,
  onChange,
  children,
}) {
  return (
    <div className="table-toolbar">
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
        <span>⌕</span>
      </SearchInput>
      {children}
    </div>
  );
}
