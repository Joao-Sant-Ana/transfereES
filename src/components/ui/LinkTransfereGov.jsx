import { ExternalLink } from 'lucide-react';
import { buildUrlTransfereGov } from '../../utils/helpers';

export default function LinkTransfereGov({ codigo }) {
  return (
    <a
      href={buildUrlTransfereGov(codigo)}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full group"
    >
      <div className="bg-gradient-to-br from-[#115e59] to-[#134e4a] hover:from-[#0f766e] hover:to-[#115e59] transition-all rounded-2xl p-5 text-center" style={{ boxShadow: 'var(--shadow-lg)' }}>
        <div className="flex items-center justify-center gap-2 text-white">
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Consultar no TransfereGov</span>
        </div>
        <p className="text-sm text-teal-200/60 mt-1">
          Relatorios de gestao, documentos e historico completo
        </p>
      </div>
    </a>
  );
}
