-- Migração inicial do Radar Art. 42
CREATE TYPE "PerfilTipo" AS ENUM ('SIGEFES_IMPORTACAO', 'SEFAZ', 'SEP', 'SUBSET_ADMIN');
CREATE TYPE "StatusValidacao" AS ENUM ('PENDENTE', 'VALIDADO', 'AJUSTADO');
CREATE TYPE "StatusHomologacao" AS ENUM ('EM_ANALISE', 'HOMOLOGADO', 'REJEITADO');

CREATE TABLE "Usuario" (
  "id" TEXT PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "perfil" "PerfilTipo" NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "atualizadoEm" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Perfil" (
  "id" TEXT PRIMARY KEY,
  "nome" "PerfilTipo" NOT NULL UNIQUE,
  "descricao" TEXT NOT NULL
);

CREATE TABLE "FonteRecurso" (
  "id" TEXT PRIMARY KEY,
  "codigo" TEXT NOT NULL UNIQUE,
  "nome" TEXT NOT NULL,
  "grupo" TEXT NOT NULL,
  "ativa" BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE "PosicaoFinanceira" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "fonteId" TEXT NOT NULL,
  "I" DECIMAL(18,2) NOT NULL,
  "II" DECIMAL(18,2) NOT NULL,
  "III" DECIMAL(18,2) NOT NULL,
  "IV" DECIMAL(18,2) NOT NULL,
  "V" DECIMAL(18,2) NOT NULL,
  "VI" DECIMAL(18,2) NOT NULL,
  "VII" DECIMAL(18,2) NOT NULL,
  "VIII" DECIMAL(18,2) NOT NULL,
  "IX" DECIMAL(18,2) NOT NULL,
  "X" DECIMAL(18,2) NOT NULL,
  "XI" DECIMAL(18,2) NOT NULL,
  "XII" DECIMAL(18,2) NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PosicaoFinanceira_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "FonteRecurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "ImportacaoSIGEFES" (
  "id" TEXT PRIMARY KEY,
  "dataPosicao" TIMESTAMP(3) NOT NULL,
  "nomeArquivo" TEXT NOT NULL,
  "hashArquivo" TEXT NOT NULL,
  "status" "StatusValidacao" NOT NULL DEFAULT 'PENDENTE',
  "observacao" TEXT,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "validadoPorId" TEXT,
  CONSTRAINT "ImportacaoSIGEFES_validadoPorId_fkey" FOREIGN KEY ("validadoPorId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "ProjecaoArrecadacao" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "fonteId" TEXT NOT NULL,
  "valor" DECIMAL(18,2) NOT NULL,
  "justificativa" TEXT NOT NULL,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProjecaoArrecadacao_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "FonteRecurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "ProjecaoArrecadacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "PressaoAdicional" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "fonteId" TEXT NOT NULL,
  "valor" DECIMAL(18,2) NOT NULL,
  "descricao" TEXT NOT NULL,
  "justificativa" TEXT NOT NULL,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PressaoAdicional_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "FonteRecurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "PressaoAdicional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "ValidacaoSetorial" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "setor" "PerfilTipo" NOT NULL,
  "status" "StatusValidacao" NOT NULL DEFAULT 'PENDENTE',
  "observacao" TEXT,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ValidacaoSetorial_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "Homologacao" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "status" "StatusHomologacao" NOT NULL DEFAULT 'EM_ANALISE',
  "observacao" TEXT,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Homologacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "LogAlteracao" (
  "id" TEXT PRIMARY KEY,
  "entidade" TEXT NOT NULL,
  "entidadeId" TEXT NOT NULL,
  "campo" TEXT NOT NULL,
  "valorAnterior" TEXT,
  "valorNovo" TEXT NOT NULL,
  "justificativa" TEXT NOT NULL,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LogAlteracao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "RelatorioGerado" (
  "id" TEXT PRIMARY KEY,
  "dataReferencia" TIMESTAMP(3) NOT NULL,
  "tipo" TEXT NOT NULL,
  "formato" TEXT NOT NULL,
  "caminhoArquivo" TEXT NOT NULL,
  "usuarioId" TEXT NOT NULL,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RelatorioGerado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "PosicaoFinanceira_dataReferencia_fonteId_idx" ON "PosicaoFinanceira" ("dataReferencia", "fonteId");
