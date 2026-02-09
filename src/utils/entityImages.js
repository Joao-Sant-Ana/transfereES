/**
 * Mapeamento de entes do ES para imagens de brasão.
 *
 * Fonte: Wikimedia Commons via Special:FilePath (redirecionamento público).
 * Padrão: https://commons.wikimedia.org/wiki/Special:FilePath/{arquivo}?width={size}
 *
 * Quando a imagem não carregar, o componente deve usar onError para fallback.
 */

const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath';

// Mapeamento: nome normalizado do ente → nome do arquivo no Wikimedia Commons
const brasoes = {
  'estado do espirito santo': 'Brasão_do_Espírito_Santo.svg',
  'espirito santo': 'Brasão_do_Espírito_Santo.svg',
  'vitoria': 'Brasão_de_Vitória_(Espírito_Santo).png',
  'serra': 'Brasão_da_Serra_(Espírito_Santo).png',
  'vila velha': 'Brasão_de_Vila_Velha_(Espírito_Santo).png',
  'cariacica': 'Coat_of_arms_of_Cariacica_ES.png',
  'cachoeiro de itapemirim': 'Brasão_Cachoeiro_de_Itapemirim.svg',
  'linhares': 'Brasão_de_Linhares_(Espírito_Santo).png',
  'colatina': 'Brasão_de_Colatina_ES.png',
  'guarapari': 'Brasão_de_Guarapari.png',
  'sao mateus': 'Brasão_de_São_Mateus_(Espírito_Santo).png',
  'aracruz': 'Brasão_de_Aracruz_-_ES.svg',
  'viana': 'Brasão_de_Viana_(Espírito_Santo).png',
  'alegre': 'Brasão_de_Alegre_ES.png',
  'castelo': 'Brasão_de_Castelo_(Espírito_Santo).png',
  'domingos martins': 'Brasão_de_Domingos_Martins_-_ES.svg',
  'santa maria de jetiba': 'Brasão_Santa_Maria_de_Jetibá.svg',
  'venda nova do imigrante': 'Brasão_de_Venda_Nova_do_Imigrante_-_ES.svg',
  'alfredo chaves': 'Brasão_de_Alfredo_Chaves_-_ES.svg',
  'anchieta': 'Brasão_de_Anchieta_(Espírito_Santo).png',
  'fundao': 'Brasão_de_Fundão_(Espírito_Santo).png',
  'iconha': 'Brasão_de_Iconha_ES.png',
  'itapemirim': 'Brasão_de_Itapemirim.png',
  'marataizes': 'Brasão_de_Marataízes.png',
  'santa teresa': 'Brasão_de_Santa_Teresa_(Espírito_Santo).png',
  'ibiracu': 'Brasão_de_Ibiraçu_ES.png',
  'barra de sao francisco': 'Brasão_de_Barra_de_São_Francisco_-_ES.svg',
  'nova venecia': 'Brasão_de_Nova_Venécia_-_ES.svg',
  'sao gabriel da palha': 'Brasão_de_São_Gabriel_da_Palha_ES.png',
  'conceicao da barra': 'Brasão_de_Conceição_da_Barra_ES.png',
  'pinheiros': 'Brasão_de_Pinheiros_-_ES.svg',
  'baixo guandu': 'Brasão_de_Baixo_Guandu.png',
  'afonso claudio': 'Brasão_de_Afonso_Cláudio_ES.png',
  'santa leopoldina': 'Brasão_de_Santa_Leopoldina_(Espírito_Santo).png',
  'ecoporanga': 'Brasão_de_Ecoporanga_-_ES.svg',
  'guacui': 'Brasão_de_Guaçuí_-_ES.svg',
  'iuna': 'Brasão_de_Iúna_-_ES.svg',
  'mimoso do sul': 'Brasão_de_Mimoso_do_Sul.png',
  'muqui': 'Brasão_de_Muqui_ES.png',
  'muniz freire': 'Brasão_de_Muniz_Freire.png',
  'joao neiva': 'Brasão_de_João_Neiva_ES.png',
  'marechal floriano': 'Brasão_de_Marechal_Floriano_-_ES.svg',
  'brejetuba': 'Brasão_de_Brejetuba_ES.png',
  'sooretama': 'Brasão_de_Sooretama_ES.png',
  'pancas': 'Brasão_de_Pancas_-_ES.svg',
  'montanha': 'Brasão_de_Montanha_-_ES.svg',
  'pedro canario': 'Brasão_de_Pedro_Canário_-_ES.svg',
  'rio bananal': 'Brasão_de_Rio_Bananal_-_ES.svg',
  'jaguare': 'Brasão_de_Jaguaré.png',
  'vargem alta': 'Brasão_de_Vargem_Alta_-_ES.svg',
};

/**
 * Normaliza nome removendo prefixos, acentos e convertendo para minúsculas.
 */
function normalizarNome(nome) {
  return nome
    .replace(/^MUNICIPIO DE\s+/i, '')
    .replace(/^ESTADO D[OE]\s+/i, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Retorna a URL do brasão de um ente.
 * @param {string} nome - Nome do ente como aparece nos dados
 * @param {number} size - Largura desejada em pixels (default: 100)
 * @returns {string|null} URL do brasão ou null se não mapeado
 */
export function getBrasaoUrl(nome, size = 100) {
  if (!nome) return null;
  const nomeNorm = normalizarNome(nome);
  const arquivo = brasoes[nomeNorm];
  if (!arquivo) return null;
  return `${WIKI}/${encodeURIComponent(arquivo)}?width=${size}`;
}
