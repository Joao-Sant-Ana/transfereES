# Workflow para agentes

Este documento organiza como agentes (humanos ou automatizados) devem operar no projeto.

## 1) Preparação
- Confirmar branch atual (`git branch --show-current`).
- Verificar alterações pendentes (`git status`).
- Ler `AGENTS.md` (raiz) e `README.md`.

## 2) Implementação
- Preferir alterações incrementais por tema.
- Evitar refactors grandes sem pedido explícito.
- Manter nomes e padrões já usados no projeto.

## 3) Validação mínima obrigatória
- `npm run lint`
- `npm run build`

## 4) Entrega
- Commit com mensagem clara no padrão:
  - `feat: ...`
  - `fix: ...`
  - `docs: ...`
  - `chore: ...`
- Abrir PR com:
  - contexto
  - mudanças realizadas
  - como validar
  - riscos e próximos passos

## 5) Regras de segurança
- Nunca incluir token ou segredo em arquivos versionados.
- Se credenciais aparecerem em histórico local, rotacionar imediatamente no provedor.
