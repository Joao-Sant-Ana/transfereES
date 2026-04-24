# Arquitetura da Solução

## Visão em camadas
- **Camada de apresentação (Next.js App Router):** páginas institucionais e fluxos por perfil.
- **Camada de domínio (lib/ e utils/):** regras de cálculo, classificação de farol e validações.
- **Camada de dados (Prisma + PostgreSQL):** persistência transacional com trilha de auditoria.
- **Camada de integração:** ponto de entrada para importações SIGEFES via arquivo e futura API.

## Pontos de integração futura com SIGEFES
1. **`app/importacoes/page.tsx`**: fluxo de upload e pré-validação do arquivo exportado.
2. **`lib/sigefes-parser.ts` (a criar no próximo incremento)**: normalização de colunas CSV/XLSX.
3. **`app/api/importacoes/sigefes/route.ts` (a criar no próximo incremento)**: endpoint server-side para recebimento automatizado.
4. **`ImportacaoSIGEFES`** no Prisma: versionamento, hash e status de validação do lote.

## Estratégia de evolução recomendada
- Fase 1: fluxo de upload manual + validação SEFAZ.
- Fase 2: API autenticada com token técnico para envio automático do SIGEFES.
- Fase 3: sincronização incremental por data de posição e reprocessamento.
