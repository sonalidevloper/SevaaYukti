import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const bgColors = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        {icons[type]}
        <p className="flex-1 font-medium">{message}</p>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
