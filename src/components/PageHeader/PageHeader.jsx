import React from "react";
import { Home } from "lucide-react";
import "./PageHeader.css";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <div className="breadcrumbs">
        <Home size={13} />
        <span>/</span>
        <span>{title}</span>
      </div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
