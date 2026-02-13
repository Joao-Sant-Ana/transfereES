import entityImageFiles from './entityImageFiles.json';

function normalizarNome(nome) {
  return nome
    .replace(/^MUNICIPIO D[EAO]\s+/i, '')
    .replace(/^ESTADO D[OE]\s+/i, '')
    .replace(/^GOVERNO D[OE]\s+/i, '')
    .replace(/^GOVERNO DO ESTADO D[OE]\s+/i, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getBrasaoUrl(nome) {
  if (!nome) return null;
  const nomeNorm = normalizarNome(nome);
  return entityImageFiles[nomeNorm] || entityImageFiles['espirito santo'] || null;
}
