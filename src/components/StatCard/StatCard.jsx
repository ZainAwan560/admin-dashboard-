import React from "react";
import "./StatCard.css";

export default function StatCard({
  icon,
  label,
  value,
  change,
  tone = "purple",
}) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__icon">{icon}</span>
        <span className="stat-card__change">{change}</span>
      </div>
      <strong className="stat-card__value">{value}</strong>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}
