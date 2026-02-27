import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onClose, className = '' }) => {
  const types = {
    success: {
      bg: 'bg-success/10',
      border: 'border-success',
      text: 'text-success',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-error/10',
      border: 'border-error',
      text: 'text-error',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning',
      text: 'text-warning',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-accent/10',
      border: 'border-accent',
      text: 'text-accent',
      icon: Info,
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} ${config.border} border-l-4 p-4 rounded-lg animate-slideIn ${className}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${config.text} flex-shrink-0 mt-0.5`} size={20} />
        <div className="flex-1">
          {title && (
            <div className={`font-semibold ${config.text} mb-1`}>{title}</div>
          )}
          <div className="text-sm text-textDark">{message}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
