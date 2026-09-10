import React from "react";
import CustomerAvatar from "../CustomerAvatar/CustomerAvatar";
import "./CustomerCell.css";

export default function CustomerCell({ name, email }) {
  return (
    <div className="customer-cell">
      <CustomerAvatar name={name} />
      <div>
        <strong>{name}</strong>
        {email && <small>{email}</small>}
      </div>
    </div>
  );
}
