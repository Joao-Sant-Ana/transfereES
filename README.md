# transfereES

Painel em React + Vite para consulta e visualização de transferências e dados públicos do Espírito Santo.

## Stack
- React 19
- Vite 7
- Tailwind CSS 4
- ESLint 9

## Scripts
- `npm run dev` — ambiente local
- `npm run lint` — validação estática
- `npm run build` — build de produção
- `npm run preview` — preview local do build

## Estrutura principal
- `src/` — interface, páginas, hooks, serviços e utilitários
- `public/dados-es.json` — cache de dados utilizado pela aplicação
- `scripts/generate-cache.js` — rotina de geração/atualização de cache
- `.github/workflows/update-cache.yml` — atualiza cache periodicamente
- `.github/workflows/deploy.yml` — publica no GitHub Pages

## Deploy
O projeto é publicado no GitHub Pages por workflow de CI/CD:
1. Push em `main` dispara build e deploy.
2. Atualizações automáticas de cache (`update-cache.yml`) podem disparar novo deploy via `repository_dispatch`.

## Organização para agentes
Para padronizar contribuições automatizadas:
- Regras base em `AGENTS.md`.
- Fluxo operacional em `docs/WORKFLOW_AGENTES.md`.

## Requisitos
- Node.js 20+
- npm 10+

## Desenvolvimento local
```bash
npm ci
npm run dev
```

## Validação antes de PR
```bash
npm run lint
npm run build
```
