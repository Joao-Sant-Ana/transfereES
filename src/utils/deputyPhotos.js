/**
 * Mapeamento de parlamentares do ES para fotos oficiais.
 *
 * Deputados federais: fotos da Câmara dos Deputados
 * URL: https://www.camara.leg.br/internet/deputado/bandep/{id}.jpg
 *
 * Senadores: fotos do Senado Federal
 * URL: https://www.senado.leg.br/senadores/img/fotos-oficiais/senador{codigo}.jpg
 */

const CAMARA_FOTO_URL = 'https://www.camara.leg.br/internet/deputado/bandep';
const SENADO_FOTO_URL = 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador';

// Mapeamento: nome normalizado → { id, tipo }
const parlamentares = {
  // Legislatura 57 (2023-2027) - Deputados atuais do ES
  'amaro neto': { id: 204356, tipo: 'camara' },
  'da vitoria': { id: 204355, tipo: 'camara' },
  'dr. victor linhalis': { id: 220528, tipo: 'camara' },
  'evair vieira de melo': { id: 178871, tipo: 'camara' },
  'gilson daniel': { id: 220529, tipo: 'camara' },
  'gilvan da federal': { id: 220526, tipo: 'camara' },
  'helder salomao': { id: 178873, tipo: 'camara' },
  'jack rocha': { id: 220527, tipo: 'camara' },
  'messias donato': { id: 220530, tipo: 'camara' },
  'paulo folletto': { id: 160517, tipo: 'camara' },

  // Legislatura 56 (2019-2023) - Deputados anteriores do ES
  'dra. soraya manato': { id: 81297, tipo: 'camara' },
  'felipe rigoni': { id: 204371, tipo: 'camara' },
  'lauriete': { id: 160534, tipo: 'camara' },
  'neucimar fraga': { id: 74165, tipo: 'camara' },
  'paulo foletto': { id: 160517, tipo: 'camara' },
  'ted conti': { id: 206231, tipo: 'camara' },

  // Senadores do ES
  'magno malta': { id: 631, tipo: 'senado' },
  'marcos do val': { id: 5942, tipo: 'senado' },
};

/**
 * Normaliza nome removendo acentos e convertendo para minúsculas.
 */
function normalizarNome(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Retorna a URL da foto oficial de um parlamentar.
 * @param {string} nome - Nome do parlamentar como aparece no TransfereGov
 * @returns {string|null} URL da foto ou null se não encontrado
 */
export function getFotoParlamentar(nome) {
  if (!nome) return null;
  const nomeNorm = normalizarNome(nome);
  const info = parlamentares[nomeNorm];
  if (!info) return null;

  if (info.tipo === 'senado') {
    return `${SENADO_FOTO_URL}${info.id}.jpg`;
  }
  return `${CAMARA_FOTO_URL}/${info.id}.jpg`;
}
