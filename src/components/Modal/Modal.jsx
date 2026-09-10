import React from "react";
import IconButton from "../IconButton/IconButton";
import { X } from "lucide-react";
import "./Modal.css";

export default function Modal({
  open,
  title,
  kicker,
  onClose,
  children,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal__head">
          <div>
            <span>{kicker}</span>
            <h2>{title}</h2>
          </div>
          <IconButton onClick={onClose}>
            <X size={18} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
