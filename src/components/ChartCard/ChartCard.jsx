import React from "react";
import Panel from "../Panel/Panel";
import "./ChartCard.css";

export default function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <Panel className={`chart-card ${className}`}>
      <div className="chart-card__head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Panel>
  );
}
