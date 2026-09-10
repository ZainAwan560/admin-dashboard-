import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import IconButton from "../IconButton/IconButton";
import SearchInput from "../SearchInput/SearchInput";
import "./Topbar.css";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <IconButton
        className="mobile-menu"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </IconButton>

      <SearchInput placeholder="Search...">
        <Search size={17} />
      </SearchInput>

      <div className="topbar__right">
        <IconButton>
          <Bell size={18} />
          <span className="notification" />
        </IconButton>

        <div className="avatar">ZA</div>
        <span className="topbar__admin">Admin</span>
      </div>
    </header>
  );
}
