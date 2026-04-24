export type FarolStatus = 'verde' | 'amarelo' | 'vermelho' | 'cinza';

export interface LinhaExecutiva {
  fonte: string;
  caixaLiquidoAtual: number;
  arrecadacaoPrevista: number;
  totalDisponivelProjetado: number;
  obrigacoesCompromissos: number;
  pressoesAdicionais: number;
  saldoArt42: number;
  farol: FarolStatus;
}

export interface IndicadoresDashboard {
  saldoProjetadoConsolidado: number;
  fontesEmAlerta: number;
  fontesCriticas: number;
  ultimaAtualizacao: string;
}
