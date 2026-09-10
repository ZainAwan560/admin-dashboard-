import React from "react";
import "./Table.css";

export default function Table({ headers, children, minWidth = 850 }) {
  return (
    <div className="table-scroll">
      <table style={{ minWidth }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
