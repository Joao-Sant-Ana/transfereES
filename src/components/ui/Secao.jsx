import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Card from './Card';

export default function Secao({ titulo, icone: Icone, children, aberto = false }) {
  const [expandido, setExpandido] = useState(aberto);

  return (
    <Card className="overflow-hidden mb-3">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-teal-50/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-xl">
            <Icone className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-sm font-semibold text-slate-700">{titulo}</span>
        </div>
        <div className={`transition-transform duration-200 ${expandido ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </button>
      {expandido && (
        <div className="px-5 pb-5 border-t border-teal-50 animate-fade-in">
          {children}
        </div>
      )}
    </Card>
  );
}
