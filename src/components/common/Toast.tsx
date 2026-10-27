import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Standalone global trigger helper
let globalAddToast: ((toast: Omit<ToastItem, 'id'>) => void) | null = null;

export const toast = {
  success: (message: string, title?: string) => {
    globalAddToast?.({ message, title, type: 'success' });
  },
  error: (message: string, title?: string) => {
    globalAddToast?.({ message, title, type: 'error' });
  },
  info: (message: string, title?: string) => {
    globalAddToast?.({ message, title, type: 'info' });
  },
  warning: (message: string, title?: string) => {
    globalAddToast?.({ message, title, type: 'warning' });
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toastData: Omit<ToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastItem = { ...toastData, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = toastData.duration ?? 4500;
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      return id;
    },
    [removeToast]
  );

  // Bind global helper
  React.useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);

  const success = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'success' });
  }, [addToast]);

  const error = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'error' });
  }, [addToast]);

  const info = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'info' });
  }, [addToast]);

  const warning = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'warning' });
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, info, warning }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onRemove={() => onRemove(item.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastCard: React.FC<{
  item: ToastItem;
  onRemove: () => void;
}> = ({ item, onRemove }) => {
  const getStyles = () => {
    switch (item.type) {
      case 'success':
        return {
          border: 'border-[#0E7490]/40',
          bg: 'bg-white',
          iconColor: 'text-[#0E7490]',
          icon: <CheckCircle2 className="w-5 h-5 text-[#0E7490] shrink-0" />,
          accent: 'bg-[#0E7490]'
        };
      case 'error':
        return {
          border: 'border-red-600/40',
          bg: 'bg-white',
          iconColor: 'text-[#991B1B]',
          icon: <AlertCircle className="w-5 h-5 text-[#991B1B] shrink-0" />,
          accent: 'bg-[#991B1B]'
        };
      case 'warning':
        return {
          border: 'border-amber-600/40',
          bg: 'bg-white',
          iconColor: 'text-[#D97706]',
          icon: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />,
          accent: 'bg-[#D97706]'
        };
      case 'info':
      default:
        return {
          border: 'border-cyan-600/40',
          bg: 'bg-white',
          iconColor: 'text-[#0E7490]',
          icon: <Info className="w-5 h-5 text-[#0E7490] shrink-0" />,
          accent: 'bg-[#0E7490]'
        };
    }
  };

  const style = getStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`pointer-events-auto relative overflow-hidden rounded-xl border ${style.border} ${style.bg} p-4 shadow-xl text-stone-900 flex items-start gap-3 backdrop-blur-md`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`} />
      <div className="pt-0.5">{style.icon}</div>
      <div className="flex-1 min-w-0 pr-2">
        {item.title && (
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-stone-800 mb-0.5">
            {item.title}
          </h4>
        )}
        <p className="text-xs sm:text-sm text-stone-600 leading-snug break-words">
          {item.message}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-md focus:outline-none cursor-pointer"
        aria-label="Fermer la notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
