import { IndicadoresDashboard, LinhaExecutiva } from '@/types/financeiro';

export const linhasExecutivasMock: LinhaExecutiva[] = [
  {
    fonte: '100 - Recursos Ordinários',
    caixaLiquidoAtual: 52_000_000,
    arrecadacaoPrevista: 18_500_000,
    totalDisponivelProjetado: 70_500_000,
    obrigacoesCompromissos: 21_000_000,
    pressoesAdicionais: 10_500_000,
    saldoArt42: 39_000_000,
    farol: 'verde'
  },
  {
    fonte: '201 - Convênios Federais',
    caixaLiquidoAtual: 6_000_000,
    arrecadacaoPrevista: 2_500_000,
    totalDisponivelProjetado: 8_500_000,
    obrigacoesCompromissos: 4_800_000,
    pressoesAdicionais: 3_000_000,
    saldoArt42: 700_000,
    farol: 'amarelo'
  },
  {
    fonte: '301 - Operações de Crédito',
    caixaLiquidoAtual: 3_200_000,
    arrecadacaoPrevista: 850_000,
    totalDisponivelProjetado: 4_050_000,
    obrigacoesCompromissos: 3_500_000,
    pressoesAdicionais: 1_200_000,
    saldoArt42: -650_000,
    farol: 'vermelho'
  },
  {
    fonte: '499 - Fonte em saneamento',
    caixaLiquidoAtual: 0,
    arrecadacaoPrevista: 0,
    totalDisponivelProjetado: 0,
    obrigacoesCompromissos: 0,
    pressoesAdicionais: 0,
    saldoArt42: 0,
    farol: 'cinza'
  }
];

export const indicadoresMock: IndicadoresDashboard = {
  saldoProjetadoConsolidado: linhasExecutivasMock.reduce((acc, item) => acc + item.saldoArt42, 0),
  fontesEmAlerta: linhasExecutivasMock.filter((item) => item.farol === 'amarelo').length,
  fontesCriticas: linhasExecutivasMock.filter((item) => item.farol === 'vermelho').length,
  ultimaAtualizacao: '2026-04-24T09:30:00-03:00'
};
