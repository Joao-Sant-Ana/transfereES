import { AlertCircle } from 'lucide-react';

export default function Erro({ mensagem, onRetry }) {
  return (
    <div className="bg-white rounded-2xl border border-red-200 p-8 text-center animate-fade-in-up" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="font-semibold text-slate-800 text-lg mb-2">Ops! Algo deu errado</h3>
      <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">{mensagem}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all font-medium text-sm"
          style={{ boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)' }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
