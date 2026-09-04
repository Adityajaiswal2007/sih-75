import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function ToastNotification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container" role="alert">
      <div className="toast-pill">
        <div className="toast-icon-wrap">
          <CheckCircle2 size={16} />
        </div>
        <span className="toast-message-text">{message}</span>
        <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
