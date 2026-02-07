import { ArrowLeft } from 'lucide-react';

export default function BtnVoltar({ onClick, texto }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-4 group"
    >
      <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-teal-50 transition-colors">
        <ArrowLeft className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{texto}</span>
    </button>
  );
}
