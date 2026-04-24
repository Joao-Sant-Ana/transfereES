import { KPICard } from '@/components/kpi-card';
import { TabelaExecutiva } from '@/components/tabela-executiva';
import { formatarDataHora, formatarMoeda } from '@/lib/formatters';
import { indicadoresMock, linhasExecutivasMock } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-institucional-navy">Painel Executivo Art. 42</h2>
        <p className="text-sm text-slate-600">
          Monitoramento consolidado por fonte de recurso para apoio à tomada de decisão.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          titulo="Saldo projetado consolidado"
          valor={formatarMoeda(indicadoresMock.saldoProjetadoConsolidado)}
          descricao="Soma do saldo projetado do art. 42 das fontes monitoradas."
        />
        <KPICard
          titulo="Fontes em alerta"
          valor={String(indicadoresMock.fontesEmAlerta)}
          descricao="Linhas em amarelo por margem estreita ou pendência de dados."
        />
        <KPICard
          titulo="Fontes críticas"
          valor={String(indicadoresMock.fontesCriticas)}
          descricao="Linhas em vermelho com insuficiência projetada."
        />
        <KPICard
          titulo="Última atualização"
          valor={formatarDataHora(indicadoresMock.ultimaAtualizacao)}
          descricao="Data/hora da posição consolidada mais recente."
        />
      </div>

      <TabelaExecutiva dados={linhasExecutivasMock} />
    </section>
  );
}
