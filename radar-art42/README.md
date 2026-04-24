# Radar Art. 42

Sistema web institucional, em português, para monitoramento do cumprimento do art. 42 da Lei de Responsabilidade Fiscal no âmbito do Poder Executivo Estadual.

## Visão geral
O Radar Art. 42 consolida dados financeiros por fonte de recursos, combina informações importadas do SIGEFES com lançamentos manuais controlados e oferece um painel executivo para apoiar decisões de SEFAZ, SEP e SUBSET.

## Problema que o sistema resolve
Atualmente, o processo costuma depender de planilhas descentralizadas e validações manuais dispersas. O sistema organiza esse fluxo em um produto institucional único, com trilha de auditoria, validações por perfil e relatórios formais.

## Arquitetura da solução
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** API routes / server-side no próprio Next.js
- **Persistência:** PostgreSQL + Prisma ORM
- **Relatórios:** exportação Excel (fase inicial) e estrutura preparada para PDF
- **Auditoria:** registro de alterações manuais, justificativas e homologações

Detalhes adicionais em `docs/arquitetura.md`.

## Stack tecnológica
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- ExcelJS / XLSX / PDFKit (preparação de relatórios)

## Instruções de instalação
1. Entre na pasta do projeto:
   ```bash
   cd radar-art42
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Ajuste o `DATABASE_URL` para seu PostgreSQL.
5. Gere client e aplique migração:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
6. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura de pastas
```text
radar-art42/
├── app/
├── components/
├── docs/
├── lib/
├── prisma/
├── public/
├── scripts/
├── types/
└── utils/
```

## Perfis de usuário
1. SIGEFES/Importação automática
2. SEFAZ
3. SEP
4. SUBSET/Administrador

## Fluxo operacional (SIGEFES → SEFAZ → SEP → SUBSET)
1. **SIGEFES/Importação:** envio de arquivo CSV/XLSX e criação da posição base.
2. **SEFAZ:** validação técnica dos dados importados e ajustes de classificação.
3. **SEP:** inclusão/edição da arrecadação prevista e pressões fiscais com justificativa obrigatória.
4. **SUBSET:** consolidação, homologação final e emissão de relatórios.

## Regras de cálculo do painel executivo
### Memória de cálculo técnica
- I = Disponibilidade Financeira Bruta
- II = Obrigações Financeiras
- III = Obrigações Assumidas sem Autorização Orçamentária para fins da LRF
- IV = Crédito Empenhado a Liquidar
- V = I - II - III - IV
- VI = Previsão de Arrecadação a Realizar por Fonte
- VII = V + VI
- VIII = Cota Orçamentária Liberada a Empenhar
- IX = Pressões Orçamentárias Identificadas Não Computadas Anteriormente
- X = VII - VIII - IX
- XI = Cota Orçamentária a Fixar – Disponível para Movimentação
- XII = Cota Orçamentária Bloqueada

### Mapeamento para o painel executivo
- Caixa bruto de referência = I
- Obrigações já comprometidas no caixa atual = II + III + IV
- Caixa líquido atual = V
- Arrecadação prevista até 31/12 = VI
- Total disponível projetado = VII
- Pressões futuras a considerar = VIII + IX
- Saldo projetado do art. 42 = X

## Páginas mínimas implementadas
- `/login`
- `/dashboard`
- `/fontes`
- `/importacoes`
- `/projecoes-sep`
- `/validacao-sefaz`
- `/homologacao-subset`
- `/relatorios`
- `/admin`

## Integração futura com SIGEFES
A integração real está documentada em `docs/arquitetura.md` com pontos técnicos planejados para parser, endpoint de ingestão e sincronização incremental.

## Próximos passos
- Autenticação e autorização por perfil.
- CRUD completo de projeções e pressões com trilha de auditoria.
- Upload real de CSV/XLSX com pré-visualização e versionamento de importações.
- Relatório executivo em Excel e relatório técnico em PDF.
- Dashboard com dados reais e alertas automáticos por regra de farol.
