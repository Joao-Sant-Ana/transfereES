/**
 * Mapeamento de entes do ES para imagens (bandeiras e brasões).
 *
 * Fonte: Wikimedia Commons - URLs de thumbnail pré-computadas.
 * Padrão: upload.wikimedia.org/wikipedia/commons/thumb/{md5[0]}/{md5[0:2]}/{arquivo}/{width}px-{arquivo}
 * Categoria: Flags of municipalities of Espírito Santo
 *
 * Quando a imagem não carregar, o componente deve usar onError para fallback.
 */

// Bandeiras dos municípios do ES (Wikimedia Commons)
const bandeiras = {
  'afonso claudio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Bandeira%20afonso%20claudio.png/100px-Bandeira%20afonso%20claudio.png',
  'agua doce do norte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Es-agua-doce-do-norte-bandeira-N0sKIP8h.png/100px-Es-agua-doce-do-norte-bandeira-N0sKIP8h.png',
  'aguia branca': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bandeiraaguiabranca.png/100px-Bandeiraaguiabranca.png',
  'alegre': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bandeira%20de%20Alegre%20%28Esp%C3%ADrito%20Santo%29.png/100px-Bandeira%20de%20Alegre%20%28Esp%C3%ADrito%20Santo%29.png',
  'alfredo chaves': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Bandeira%20de%20Alfredo%20Chaves%20%28Esp%C3%ADrito%20Santo%29.gif/100px-Bandeira%20de%20Alfredo%20Chaves%20%28Esp%C3%ADrito%20Santo%29.gif',
  'alto rio novo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bandeira%20Alto%20Rio%20Novo.jpg/100px-Bandeira%20Alto%20Rio%20Novo.jpg',
  'anchieta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/BandeiradoMunicipio%20anchieta.jpg/100px-BandeiradoMunicipio%20anchieta.jpg',
  'apiaca': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Es-apiaca-bandeira-hnFJQv46.jpg/100px-Es-apiaca-bandeira-hnFJQv46.jpg',
  'aracruz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bandeira%20aracruz%20es.png/100px-Bandeira%20aracruz%20es.png',
  'atilio vivacqua': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/At%C3%ADlio%20Vivacqua.jpg/100px-At%C3%ADlio%20Vivacqua.jpg',
  'baixo guandu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Flag%20of%20Baixo%20Guandu%20ES.png/100px-Flag%20of%20Baixo%20Guandu%20ES.png',
  'boa esperanca': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bandeira%20de%20Boa%20Esperan%C3%A7a%20ES.svg/100px-Bandeira%20de%20Boa%20Esperan%C3%A7a%20ES.svg.png',
  'bom jesus do norte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bandeira%20de%20Bom%20Jesus%20do%20Norte%20%28Esp%C3%ADrito%20Santo%29.gif/100px-Bandeira%20de%20Bom%20Jesus%20do%20Norte%20%28Esp%C3%ADrito%20Santo%29.gif',
  'cachoeiro de itapemirim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Bandeira%20Cachoeiro%20de%20Itapemirim.png/100px-Bandeira%20Cachoeiro%20de%20Itapemirim.png',
  'cariacica': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bandeira-cariacica.jpg/100px-Bandeira-cariacica.jpg',
  'castelo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bandeira%20de%20castelo%20es.png/100px-Bandeira%20de%20castelo%20es.png',
  'colatina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bandeira-colatina.png/100px-Bandeira-colatina.png',
  'conceicao da barra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bandeiraconceicao.jpg/100px-Bandeiraconceicao.jpg',
  'conceicao do castelo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bandeira%20concei%C3%A7%C3%A3o%20do%20castelo.jpg/100px-Bandeira%20concei%C3%A7%C3%A3o%20do%20castelo.jpg',
  'divino de sao lourenco': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bandeira-divino-de-sao-lourenco.webp/100px-Bandeira-divino-de-sao-lourenco.webp.jpg',
  'domingos martins': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/BandeiraDomingosMartinsES.jpg/100px-BandeiraDomingosMartinsES.jpg',
  'ecoporanga': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bandeira-ecoporanga.png/100px-Bandeira-ecoporanga.png',
  'fundao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Flag%20of%20Fund%C3%A3o.PNG/100px-Flag%20of%20Fund%C3%A3o.PNG',
  'governador lindenberg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bandeira%20de%20Governador%20Lindenberg%20Esp%C3%ADrito%20Santo.png/100px-Bandeira%20de%20Governador%20Lindenberg%20Esp%C3%ADrito%20Santo.png',
  'guacui': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/BandeiraGuacuiES.jpg/100px-BandeiraGuacuiES.jpg',
  'guarapari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bandeira%20nova%20de%20Guarapari.png/100px-Bandeira%20nova%20de%20Guarapari.png',
  'ibiracu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Bandeira%20de%20Ibira%C3%A7u%20%28Esp%C3%ADrito%20Santo%29.png/100px-Bandeira%20de%20Ibira%C3%A7u%20%28Esp%C3%ADrito%20Santo%29.png',
  'ibitirama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Bandeira-ibitirama%20275e82cc-75d5-4011-96dd-140981ebcbb3.webp/100px-Bandeira-ibitirama%20275e82cc-75d5-4011-96dd-140981ebcbb3.webp.jpg',
  'iconha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bandeira-iconha.jpg/100px-Bandeira-iconha.jpg',
  'irupi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Irupi%20flag.png/100px-Irupi%20flag.png',
  'itaguacu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bandeira%20de%20Itagua%C3%A7u%20%28Esp%C3%ADrito%20Santo%29.jpg/100px-Bandeira%20de%20Itagua%C3%A7u%20%28Esp%C3%ADrito%20Santo%29.jpg',
  'itapemirim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bandeira%20Itapemirim.png/100px-Bandeira%20Itapemirim.png',
  'iuna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bandeira%20de%20I%C3%BAna%20%28Esp%C3%ADrito%20Santo%29.jpg/100px-Bandeira%20de%20I%C3%BAna%20%28Esp%C3%ADrito%20Santo%29.jpg',
  'jeronimo monteiro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bandeira%20de%20Jer%C3%B4nimo%20Monteiro%20%28Esp%C3%ADrito%20Santo%29.jpg/100px-Bandeira%20de%20Jer%C3%B4nimo%20Monteiro%20%28Esp%C3%ADrito%20Santo%29.jpg',
  'joao neiva': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bandeira%20joaoneiva.jpg/100px-Bandeira%20joaoneiva.jpg',
  'linhares': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bandeira%20linhares.png/100px-Bandeira%20linhares.png',
  'mantenopolis': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Bandeira-Manten%C3%B3polis.png/100px-Bandeira-Manten%C3%B3polis.png',
  'marataizes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Bandeira-marataizes.jpg/100px-Bandeira-marataizes.jpg',
  'marechal floriano': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bandeira-cidade-marechal-floriano-es-300x218.png/100px-Bandeira-cidade-marechal-floriano-es-300x218.png',
  'marilandia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Bandeira-maril%C3%A2ndia.png/100px-Bandeira-maril%C3%A2ndia.png',
  'mimoso do sul': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flag%20of%20Mimoso%20do%20Sul%20-%20ES%20-%20Brazil.png/100px-Flag%20of%20Mimoso%20do%20Sul%20-%20ES%20-%20Brazil.png',
  'montanha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/BANDEIRA%20DE%20MONTANHA.jpg/100px-BANDEIRA%20DE%20MONTANHA.jpg',
  'muniz freire': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bandeira%20de%20Muniz%20Freire%20%28Esp%C3%ADrito%20Santo%29.png/100px-Bandeira%20de%20Muniz%20Freire%20%28Esp%C3%ADrito%20Santo%29.png',
  'nova venecia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bandeira%20de%20Nova%20Ven%C3%A9cia%20%28Esp%C3%ADrito%20Santo%29.png/100px-Bandeira%20de%20Nova%20Ven%C3%A9cia%20%28Esp%C3%ADrito%20Santo%29.png',
  'pancas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Bandeira%20de%20Pancas.png/100px-Bandeira%20de%20Pancas.png',
  'pedro canario': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pedro%20Can%C3%A1rio.gif/100px-Pedro%20Can%C3%A1rio.gif',
  'pinheiros': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Bandeira%20de%20Pinheiros%20Esp%C3%ADrito%20Santo.png/100px-Bandeira%20de%20Pinheiros%20Esp%C3%ADrito%20Santo.png',
  'piuma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Flag%20of%20Pi%C3%BAma%20ES.png/100px-Flag%20of%20Pi%C3%BAma%20ES.png',
  'ponto belo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bandeira%20ponto%20belo.jpg/100px-Bandeira%20ponto%20belo.jpg',
  'rio bananal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Bandeira-riobananal.jpg/100px-Bandeira-riobananal.jpg',
  'rio novo do sul': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bandeira-rionovodoul.jpg/100px-Bandeira-rionovodoul.jpg',
  'santa leopoldina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bandeira%20do%20munic%C3%ADpio%20de%20Santa%20Leopoldina.jpg/100px-Bandeira%20do%20munic%C3%ADpio%20de%20Santa%20Leopoldina.jpg',
  'santa maria de jetiba': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Bandeira-stamariadejetiba.jpg/100px-Bandeira-stamariadejetiba.jpg',
  'santa teresa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bandeira%20de%20Santa%20Teresa%20%28Esp%C3%ADrito%20Santo%29.jpg/100px-Bandeira%20de%20Santa%20Teresa%20%28Esp%C3%ADrito%20Santo%29.jpg',
  'sao domingos do norte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Bandeira%20de%20S%C3%A3o%20Domingos%20do%20Norte%20Esp%C3%ADrito%20Santo.png/100px-Bandeira%20de%20S%C3%A3o%20Domingos%20do%20Norte%20Esp%C3%ADrito%20Santo.png',
  'sao gabriel da palha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Bandeira-Sao-Gabriel-da%20Palha.webp/100px-Bandeira-Sao-Gabriel-da%20Palha.webp.jpg',
  'sao jose do calcado': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sjc%20bandeira.webp/100px-Sjc%20bandeira.webp.jpg',
  'sao mateus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bandeira-saomateus-es.jpg/100px-Bandeira-saomateus-es.jpg',
  'serra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bandeiradaserra.JPG/100px-Bandeiradaserra.JPG',
  'sooretama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bandeira%20de%20Sooretama%20Esp%C3%ADrito%20Santo.png/100px-Bandeira%20de%20Sooretama%20Esp%C3%ADrito%20Santo.png',
  'venda nova do imigrante': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bandeira%20de%20Venda%20Nova%20do%20Imigrante%20%28Esp%C3%ADrito%20Santo%29.png/100px-Bandeira%20de%20Venda%20Nova%20do%20Imigrante%20%28Esp%C3%ADrito%20Santo%29.png',
  'viana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bandeira-viana-es.jpg/100px-Bandeira-viana-es.jpg',
  'vila valerio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Bandeira%20de%20Vila%20Val%C3%A9rio%20no%20ES.png/100px-Bandeira%20de%20Vila%20Val%C3%A9rio%20no%20ES.png',
  'vila velha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Bandeira%20Vila%20Velha.png/100px-Bandeira%20Vila%20Velha.png',
  'vitoria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/BandeiraVitoria.png/100px-BandeiraVitoria.png',
  // Brasão do Estado como fallback
  'estado do espirito santo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg/100px-Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg.png',
  'espirito santo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg/100px-Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg.png',
  'governo do estado': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg/100px-Bras%C3%A3o_do_Esp%C3%ADrito_Santo.svg.png',
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
 * Retorna a URL da bandeira/brasão de um ente.
 * @param {string} nome - Nome do ente como aparece nos dados
 * @returns {string|null} URL da imagem ou null se não mapeado
 */
export function getBrasaoUrl(nome) {
  if (!nome) return null;
  const nomeNorm = normalizarNome(nome);
  return bandeiras[nomeNorm] || null;
}
