import { formatarMoeda } from '@/lib/formatters';
import { LinhaExecutiva } from '@/types/financeiro';
import { FarolBadge } from './farol-badge';

export function TabelaExecutiva({ dados }: { dados: LinhaExecutiva[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-institucional-border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Fonte</th>
            <th className="px-4 py-3">Caixa líquido atual</th>
            <th className="px-4 py-3">Arrecadação prevista até 31/12</th>
            <th className="px-4 py-3">Total disponível projetado</th>
            <th className="px-4 py-3">Obrigações e compromissos</th>
            <th className="px-4 py-3">Pressões adicionais</th>
            <th className="px-4 py-3">Saldo Art. 42</th>
            <th className="px-4 py-3">Farol</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((linha) => (
            <tr key={linha.fonte} className="border-t border-slate-100">
              <td className="px-4 py-3">{linha.fonte}</td>
              <td className="px-4 py-3">{formatarMoeda(linha.caixaLiquidoAtual)}</td>
              <td className="px-4 py-3">{formatarMoeda(linha.arrecadacaoPrevista)}</td>
              <td className="px-4 py-3">{formatarMoeda(linha.totalDisponivelProjetado)}</td>
              <td className="px-4 py-3">{formatarMoeda(linha.obrigacoesCompromissos)}</td>
              <td className="px-4 py-3">{formatarMoeda(linha.pressoesAdicionais)}</td>
              <td className="px-4 py-3 font-semibold">{formatarMoeda(linha.saldoArt42)}</td>
              <td className="px-4 py-3">
                <FarolBadge status={linha.farol} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
