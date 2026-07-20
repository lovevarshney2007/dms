import { useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

let _showToast = null;
export function showToast(msg, type = 'info') {
  if (_showToast) _showToast(msg, type);
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  _showToast = useCallback((msg, type) => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' && <CheckCircle size={16} color="#10B981" />}
          {t.type === 'error'   && <XCircle size={16} color="#EF4444" />}
          {t.type === 'info'    && <Info size={16} color="var(--gold)" />}
          <span style={{ flex: 1, fontSize: 13.5, color: 'var(--text)' }}>{t.msg}</span>
          <button onClick={() => setToasts(t2 => t2.filter(x => x.id !== t.id))}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
