/**
 * Mapeamento de entes do ES para imagens de brasão.
 *
 * Fonte: Wikimedia Commons - URLs de thumbnail pré-computadas.
 * Padrão: https://upload.wikimedia.org/wikipedia/commons/thumb/{md5[0]}/{md5[0:2]}/{arquivo}/{width}px-{arquivo}[.png]
 *
 * Quando a imagem não carregar, o componente deve usar onError para fallback.
 */

// URLs pré-computadas de thumbnails diretos (sem redirects)
const brasoes = {
  'estado do espirito santo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg/100px-Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg.png',
  'espirito santo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg/100px-Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg.png',
  'vitoria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bras%C3%A3o_de_Vit%C3%B3ria_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Vit%C3%B3ria_%28Esp%C3%ADrito_Santo%29.png',
  'serra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bras%C3%A3o_da_Serra_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_da_Serra_%28Esp%C3%ADrito_Santo%29.png',
  'vila velha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bras%C3%A3o_de_Vila_Velha_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Vila_Velha_%28Esp%C3%ADrito_Santo%29.png',
  'cariacica': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Cariacica_ES.png/100px-Coat_of_arms_of_Cariacica_ES.png',
  'cachoeiro de itapemirim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bras%C3%A3o_Cachoeiro_de_Itapemirim.svg/100px-Bras%C3%A3o_Cachoeiro_de_Itapemirim.svg.png',
  'linhares': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bras%C3%A3o_de_Linhares_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Linhares_%28Esp%C3%ADrito_Santo%29.png',
  'colatina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Bras%C3%A3o_de_Colatina_ES.png/100px-Bras%C3%A3o_de_Colatina_ES.png',
  'guarapari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bras%C3%A3o_de_Guarapari.png/100px-Bras%C3%A3o_de_Guarapari.png',
  'sao mateus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Bras%C3%A3o_de_S%C3%A3o_Mateus_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_S%C3%A3o_Mateus_%28Esp%C3%ADrito_Santo%29.png',
  'aracruz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bras%C3%A3o_de_Aracruz_-_ES.svg/100px-Bras%C3%A3o_de_Aracruz_-_ES.svg.png',
  'viana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bras%C3%A3o_de_Viana_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Viana_%28Esp%C3%ADrito_Santo%29.png',
  'alegre': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bras%C3%A3o_de_Alegre_ES.png/100px-Bras%C3%A3o_de_Alegre_ES.png',
  'castelo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bras%C3%A3o_de_Castelo_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Castelo_%28Esp%C3%ADrito_Santo%29.png',
  'domingos martins': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bras%C3%A3o_de_Domingos_Martins_-_ES.svg/100px-Bras%C3%A3o_de_Domingos_Martins_-_ES.svg.png',
  'santa maria de jetiba': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bras%C3%A3o_Santa_Maria_de_Jetib%C3%A1.svg/100px-Bras%C3%A3o_Santa_Maria_de_Jetib%C3%A1.svg.png',
  'venda nova do imigrante': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bras%C3%A3o_de_Venda_Nova_do_Imigrante_-_ES.svg/100px-Bras%C3%A3o_de_Venda_Nova_do_Imigrante_-_ES.svg.png',
  'alfredo chaves': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bras%C3%A3o_de_Alfredo_Chaves_-_ES.svg/100px-Bras%C3%A3o_de_Alfredo_Chaves_-_ES.svg.png',
  'anchieta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Bras%C3%A3o_de_Anchieta_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Anchieta_%28Esp%C3%ADrito_Santo%29.png',
  'fundao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bras%C3%A3o_de_Fund%C3%A3o_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Fund%C3%A3o_%28Esp%C3%ADrito_Santo%29.png',
  'iconha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bras%C3%A3o_de_Iconha_ES.png/100px-Bras%C3%A3o_de_Iconha_ES.png',
  'itapemirim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bras%C3%A3o_de_Itapemirim.png/100px-Bras%C3%A3o_de_Itapemirim.png',
  'marataizes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Bras%C3%A3o_de_Marata%C3%ADzes.png/100px-Bras%C3%A3o_de_Marata%C3%ADzes.png',
  'santa teresa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bras%C3%A3o_de_Santa_Teresa_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Santa_Teresa_%28Esp%C3%ADrito_Santo%29.png',
  'ibiracu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bras%C3%A3o_de_Ibira%C3%A7u_ES.png/100px-Bras%C3%A3o_de_Ibira%C3%A7u_ES.png',
  'barra de sao francisco': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bras%C3%A3o_de_Barra_de_S%C3%A3o_Francisco_-_ES.svg/100px-Bras%C3%A3o_de_Barra_de_S%C3%A3o_Francisco_-_ES.svg.png',
  'nova venecia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bras%C3%A3o_de_Nova_Ven%C3%A9cia_-_ES.svg/100px-Bras%C3%A3o_de_Nova_Ven%C3%A9cia_-_ES.svg.png',
  'sao gabriel da palha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bras%C3%A3o_de_S%C3%A3o_Gabriel_da_Palha_ES.png/100px-Bras%C3%A3o_de_S%C3%A3o_Gabriel_da_Palha_ES.png',
  'conceicao da barra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Bras%C3%A3o_de_Concei%C3%A7%C3%A3o_da_Barra_ES.png/100px-Bras%C3%A3o_de_Concei%C3%A7%C3%A3o_da_Barra_ES.png',
  'pinheiros': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bras%C3%A3o_de_Pinheiros_-_ES.svg/100px-Bras%C3%A3o_de_Pinheiros_-_ES.svg.png',
  'baixo guandu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Bras%C3%A3o_de_Baixo_Guandu.png/100px-Bras%C3%A3o_de_Baixo_Guandu.png',
  'afonso claudio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bras%C3%A3o_de_Afonso_Cl%C3%A1udio_ES.png/100px-Bras%C3%A3o_de_Afonso_Cl%C3%A1udio_ES.png',
  'santa leopoldina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bras%C3%A3o_de_Santa_Leopoldina_%28Esp%C3%ADrito_Santo%29.png/100px-Bras%C3%A3o_de_Santa_Leopoldina_%28Esp%C3%ADrito_Santo%29.png',
  'ecoporanga': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bras%C3%A3o_de_Ecoporanga_-_ES.svg/100px-Bras%C3%A3o_de_Ecoporanga_-_ES.svg.png',
  'guacui': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Bras%C3%A3o_de_Gua%C3%A7u%C3%AD_-_ES.svg/100px-Bras%C3%A3o_de_Gua%C3%A7u%C3%AD_-_ES.svg.png',
  'iuna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Bras%C3%A3o_de_I%C3%BAna_-_ES.svg/100px-Bras%C3%A3o_de_I%C3%BAna_-_ES.svg.png',
  'mimoso do sul': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Bras%C3%A3o_de_Mimoso_do_Sul.png/100px-Bras%C3%A3o_de_Mimoso_do_Sul.png',
  'muqui': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Bras%C3%A3o_de_Muqui_ES.png/100px-Bras%C3%A3o_de_Muqui_ES.png',
  'muniz freire': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bras%C3%A3o_de_Muniz_Freire.png/100px-Bras%C3%A3o_de_Muniz_Freire.png',
  'joao neiva': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Bras%C3%A3o_de_Jo%C3%A3o_Neiva_ES.png/100px-Bras%C3%A3o_de_Jo%C3%A3o_Neiva_ES.png',
  'marechal floriano': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bras%C3%A3o_de_Marechal_Floriano_-_ES.svg/100px-Bras%C3%A3o_de_Marechal_Floriano_-_ES.svg.png',
  'brejetuba': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bras%C3%A3o_de_Brejetuba_ES.png/100px-Bras%C3%A3o_de_Brejetuba_ES.png',
  'sooretama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Bras%C3%A3o_de_Sooretama_ES.png/100px-Bras%C3%A3o_de_Sooretama_ES.png',
  'pancas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bras%C3%A3o_de_Pancas_-_ES.svg/100px-Bras%C3%A3o_de_Pancas_-_ES.svg.png',
  'montanha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bras%C3%A3o_de_Montanha_-_ES.svg/100px-Bras%C3%A3o_de_Montanha_-_ES.svg.png',
  'pedro canario': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bras%C3%A3o_de_Pedro_Can%C3%A1rio_-_ES.svg/100px-Bras%C3%A3o_de_Pedro_Can%C3%A1rio_-_ES.svg.png',
  'rio bananal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bras%C3%A3o_de_Rio_Bananal_-_ES.svg/100px-Bras%C3%A3o_de_Rio_Bananal_-_ES.svg.png',
  'jaguare': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bras%C3%A3o_de_Jaguar%C3%A9.png/100px-Bras%C3%A3o_de_Jaguar%C3%A9.png',
  'vargem alta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Bras%C3%A3o_de_Vargem_Alta_-_ES.svg/100px-Bras%C3%A3o_de_Vargem_Alta_-_ES.svg.png',
};

/**
 * Normaliza nome removendo prefixos, acentos e convertendo para minúsculas.
 */
function normalizarNome(nome) {
  return nome
    .replace(/^MUNICIPIO DE\s+/i, '')
    .replace(/^ESTADO D[OE]\s+/i, '')
    .replace(/^GOVERNO D[OE]\s+/i, '')
    .replace(/^GOVERNO DO ESTADO D[OE]\s+/i, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Retorna a URL do brasão de um ente.
 * @param {string} nome - Nome do ente como aparece nos dados
 * @returns {string|null} URL do brasão ou null se não mapeado
 */
export function getBrasaoUrl(nome) {
  if (!nome) return null;
  const nomeNorm = normalizarNome(nome);
  return brasoes[nomeNorm] || null;
}
