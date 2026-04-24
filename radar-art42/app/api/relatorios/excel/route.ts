import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';
import { linhasExecutivasMock } from '@/lib/mock-data';

export async function GET() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Painel Executivo');

  worksheet.columns = [
    { header: 'Fonte', key: 'fonte', width: 28 },
    { header: 'Caixa líquido atual', key: 'caixaLiquidoAtual', width: 20 },
    { header: 'Arrecadação prevista até 31/12', key: 'arrecadacaoPrevista', width: 30 },
    { header: 'Total disponível projetado', key: 'totalDisponivelProjetado', width: 24 },
    { header: 'Obrigações e compromissos', key: 'obrigacoesCompromissos', width: 24 },
    { header: 'Pressões adicionais', key: 'pressoesAdicionais', width: 18 },
    { header: 'Saldo Art. 42', key: 'saldoArt42', width: 18 },
    { header: 'Farol', key: 'farol', width: 12 }
  ];

  linhasExecutivasMock.forEach((item) => worksheet.addRow(item));

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="relatorio-executivo-art42.xlsx"'
    }
  });
}
