import { PrismaClient, PerfilTipo, StatusHomologacao, StatusValidacao } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.$transaction([
    prisma.usuario.upsert({
      where: { email: 'sigefes@es.gov.br' },
      update: {},
      create: { nome: 'Integração SIGEFES', email: 'sigefes@es.gov.br', perfil: PerfilTipo.SIGEFES_IMPORTACAO }
    }),
    prisma.usuario.upsert({
      where: { email: 'sefaz@es.gov.br' },
      update: {},
      create: { nome: 'Analista SEFAZ', email: 'sefaz@es.gov.br', perfil: PerfilTipo.SEFAZ }
    }),
    prisma.usuario.upsert({
      where: { email: 'sep@es.gov.br' },
      update: {},
      create: { nome: 'Equipe SEP', email: 'sep@es.gov.br', perfil: PerfilTipo.SEP }
    }),
    prisma.usuario.upsert({
      where: { email: 'subset@es.gov.br' },
      update: {},
      create: { nome: 'Administrador SUBSET', email: 'subset@es.gov.br', perfil: PerfilTipo.SUBSET_ADMIN }
    })
  ]);

  const fonte100 = await prisma.fonteRecurso.upsert({
    where: { codigo: '100' },
    update: {},
    create: { codigo: '100', nome: 'Recursos Ordinários', grupo: 'Tesouro Estadual' }
  });

  await prisma.posicaoFinanceira.create({
    data: {
      dataReferencia: new Date('2026-04-24T00:00:00.000Z'),
      fonteId: fonte100.id,
      I: 72000000,
      II: 15000000,
      III: 2000000,
      IV: 4000000,
      V: 51000000,
      VI: 18500000,
      VII: 69500000,
      VIII: 9000000,
      IX: 500000,
      X: 60000000,
      XI: 2200000,
      XII: 1500000
    }
  });

  await prisma.importacaoSIGEFES.create({
    data: {
      dataPosicao: new Date('2026-04-24T00:00:00.000Z'),
      nomeArquivo: 'sigefes_posicao_2026-04-24.xlsx',
      hashArquivo: 'hash-ficticio-001',
      status: StatusValidacao.VALIDADO,
      validadoPorId: usuarios[1].id
    }
  });

  await prisma.validacaoSetorial.create({
    data: {
      dataReferencia: new Date('2026-04-24T00:00:00.000Z'),
      setor: PerfilTipo.SEFAZ,
      status: StatusValidacao.VALIDADO,
      observacao: 'Posição conferida e classificada.',
      usuarioId: usuarios[1].id
    }
  });

  await prisma.homologacao.create({
    data: {
      dataReferencia: new Date('2026-04-24T00:00:00.000Z'),
      status: StatusHomologacao.EM_ANALISE,
      observacao: 'Aguardando deliberação final da SUBSET.',
      usuarioId: usuarios[3].id
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
