# AGENTS.md

Este repositório usa este arquivo como contexto base para qualquer agente que atue no projeto.

## Objetivo
- Aplicação React + Vite para visualização de dados do ES.
- Deploy automático no GitHub Pages via GitHub Actions.

## Fluxo padrão para agentes
1. Ler `README.md` e `.github/workflows/*.yml` antes de alterar infraestrutura.
2. Fazer mudanças pequenas e focadas.
3. Rodar validações locais antes de commitar:
   - `npm run lint`
   - `npm run build`
4. Não commitar segredos, tokens ou credenciais.
5. Atualizar documentação quando alterar comportamento, scripts ou fluxo de deploy.

## Convenções de mudanças
- Código-fonte da interface em `src/`.
- Dados estáticos/cache em `public/`.
- Automação de cache em `scripts/generate-cache.js`.
- CI/CD em `.github/workflows/`.

## Checklist de PR
- [ ] Mudança descrita no PR em linguagem direta.
- [ ] Build local executado com sucesso.
- [ ] Lint executado com sucesso.
- [ ] Não há segredo em código, commit ou docs.
