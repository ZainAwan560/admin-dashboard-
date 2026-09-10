import React from "react";
import { PackageOpen } from "lucide-react";
import "./EmptyState.css";

export default function EmptyState({
  title = "No data found",
  text = "Nothing to show here.",
}) {
  return (
    <div className="empty-state">
      <PackageOpen />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
