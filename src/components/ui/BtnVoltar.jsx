import { ArrowLeft } from 'lucide-react';

export default function BtnVoltar({ onClick, texto, light }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 transition-colors mb-4 group ${
        light
          ? 'text-white/70 hover:text-white'
          : 'text-slate-500 hover:text-teal-600'
      }`}
    >
      <div className={`p-1.5 rounded-lg transition-colors ${
        light
          ? 'bg-white/10 group-hover:bg-white/20'
          : 'bg-slate-100 group-hover:bg-teal-50'
      }`}>
        <ArrowLeft className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{texto}</span>
    </button>
  );
}
