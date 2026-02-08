import { useState, useMemo } from 'react';
import { Search, TrendingUp, Building2, Users, Landmark, Building, ArrowRight, ToggleLeft, ToggleRight, Filter, BookOpen } from 'lucide-react';
import Card from '../components/ui/Card';
import { formatarMoeda, formatarMoedaCompacta } from '../utils/formatters';
import { getFotoParlamentar } from '../utils/deputyPhotos';

export default function PaginaInicial({
  dados,
  anoFiltro,
  onAnoChange,
  areaFiltro,
  onAreaChange,
  somenteEfetivadas,
  onEfetivadosChange,
  onEnte,
  onParlamentar
}) {
  const [buscaE, setBuscaE] = useState('');
  const [buscaP, setBuscaP] = useState('');

  const {
    estado,
    municipios,
    parlamentares,
    porAno,
    porAnoEstado,
    porAnoMunicipios,
    porAnoEfetivado,
    porAnoEstadoEfetivado,
    porAnoMunicipiosEfetivado,
    porArea,
    porAreaPorAno,
    porAreaEfetivado,
    porAreaPorAnoEfetivado,
    totalEstado,
    totalMunicipios,
    totalGeral,
    totalEstadoEfetivado,
    totalMunicipiosEfetivado,
    totalGeralEfetivado
  } = dados;

  const anos = Object.keys(porAno).sort();

  const dadosFiltrados = useMemo(() => {
    const useLiberado = somenteEfetivadas;

    if (!anoFiltro) {
      return {
        total: useLiberado ? (totalGeralEfetivado || 0) : totalGeral,
        totalEst: useLiberado ? (totalEstadoEfetivado || 0) : totalEstado,
        totalMun: useLiberado ? (totalMunicipiosEfetivado || 0) : totalMunicipios,
        labelPeriodo: `${anos[0]}-${anos[anos.length - 1]}`
      };
    }
    const anoNum = parseInt(anoFiltro);
    return {
      total: useLiberado
        ? (porAnoEfetivado?.[anoNum] || 0)
        : (porAno[anoNum] || 0),
      totalEst: useLiberado
        ? (porAnoEstadoEfetivado?.[anoNum] || 0)
        : (porAnoEstado?.[anoNum] || 0),
      totalMun: useLiberado
        ? (porAnoMunicipiosEfetivado?.[anoNum] || 0)
        : (porAnoMunicipios?.[anoNum] || 0),
      labelPeriodo: anoFiltro.toString()
    };
  }, [anoFiltro, somenteEfetivadas, porAno, porAnoEstado, porAnoMunicipios, porAnoEfetivado, porAnoEstadoEfetivado, porAnoMunicipiosEfetivado, totalGeral, totalEstado, totalMunicipios, totalGeralEfetivado, totalEstadoEfetivado, totalMunicipiosEfetivado, anos]);

  const calcularValorEnte = (ente) => {
    if (somenteEfetivadas) {
      if (anoFiltro) {
        return ente.anosEfetivados?.[parseInt(anoFiltro)] || 0;
      }
      return Object.values(ente.anosEfetivados || {}).reduce((a, b) => a + b, 0);
    } else {
      if (anoFiltro) {
        return ente.anos[parseInt(anoFiltro)] || 0;
      }
      return Object.values(ente.anos).reduce((a, b) => a + b, 0);
    }
  };

  const calcularValorParlamentar = (p) => {
    if (somenteEfetivadas) {
      if (anoFiltro) {
        return p.anosEfetivados?.[parseInt(anoFiltro)] || 0;
      }
      return p.totalEfetivado || 0;
    } else {
      if (anoFiltro) {
        return p.anos[parseInt(anoFiltro)] || 0;
      }
      return p.total;
    }
  };

  const contarPlanosFiltrados = (planos) => {
    let lista = planos;
    if (anoFiltro) {
      lista = lista.filter(p => p.ano === parseInt(anoFiltro));
    }
    if (areaFiltro) {
      lista = lista.filter(p => p.area_politica === areaFiltro);
    }
    if (somenteEfetivadas) {
      lista = lista.filter(p => p.valor_efetivado > 0);
    }
    return lista.length;
  };

  const muniF = useMemo(() => {
    let lista = municipios;

    if (anoFiltro) {
      const anoNum = parseInt(anoFiltro);
      lista = lista.filter(m => {
        if (somenteEfetivadas) {
          return (m.anosEfetivados?.[anoNum] || 0) > 0;
        }
        return m.anos[anoNum] && m.anos[anoNum] > 0;
      });
    } else if (somenteEfetivadas) {
      lista = lista.filter(m => {
        const totalEfetivado = Object.values(m.anosEfetivados || {}).reduce((a, b) => a + b, 0);
        return totalEfetivado > 0;
      });
    }

    if (areaFiltro) {
      lista = lista.filter(m =>
        m.planos.some(p => {
          const matchArea = p.area_politica === areaFiltro;
          const matchAno = !anoFiltro || p.ano === parseInt(anoFiltro);
          const matchEfetivado = !somenteEfetivadas || p.valor_efetivado > 0;
          return matchArea && matchAno && matchEfetivado;
        })
      );
    }

    if (buscaE) {
      lista = lista.filter(m => m.nome.toLowerCase().includes(buscaE.toLowerCase()));
    }

    lista = [...lista].sort((a, b) => calcularValorEnte(b) - calcularValorEnte(a));

    return lista;
  }, [municipios, anoFiltro, areaFiltro, somenteEfetivadas, buscaE]);

  const parlF = useMemo(() => {
    let lista = parlamentares;

    if (anoFiltro) {
      const anoNum = parseInt(anoFiltro);
      lista = lista.filter(p => {
        if (somenteEfetivadas) {
          return (p.anosEfetivados?.[anoNum] || 0) > 0;
        }
        return p.anos[anoNum] && p.anos[anoNum] > 0;
      });
    } else if (somenteEfetivadas) {
      lista = lista.filter(p => (p.totalEfetivado || 0) > 0);
    }

    if (areaFiltro) {
      lista = lista.filter(p =>
        p.planos.some(pl => {
          const matchArea = pl.area_politica === areaFiltro;
          const matchAno = !anoFiltro || pl.ano === parseInt(anoFiltro);
          const matchEfetivado = !somenteEfetivadas || pl.valor_efetivado > 0;
          return matchArea && matchAno && matchEfetivado;
        })
      );
    }

    if (buscaP) {
      lista = lista.filter(p => p.nome.toLowerCase().includes(buscaP.toLowerCase()));
    }

    lista = [...lista].sort((a, b) => calcularValorParlamentar(b) - calcularValorParlamentar(a));

    return lista;
  }, [parlamentares, anoFiltro, areaFiltro, somenteEfetivadas, buscaP]);

  const estadoVisivel = useMemo(() => {
    if (!estado) return false;

    const valorEstado = calcularValorEnte(estado);
    if (valorEstado <= 0) return false;

    if (areaFiltro) {
      return estado.planos.some(p => {
        const matchArea = p.area_politica === areaFiltro;
        const matchAno = !anoFiltro || p.ano === parseInt(anoFiltro);
        const matchEfetivado = !somenteEfetivadas || p.valor_efetivado > 0;
        return matchArea && matchAno && matchEfetivado;
      });
    }

    return true;
  }, [estado, anoFiltro, areaFiltro, somenteEfetivadas]);

  const dadosArea = useMemo(() => {
    let areaData;
    if (somenteEfetivadas) {
      if (anoFiltro && porAreaPorAnoEfetivado) {
        areaData = porAreaPorAnoEfetivado[parseInt(anoFiltro)] || {};
      } else {
        areaData = porAreaEfetivado || {};
      }
    } else {
      if (anoFiltro && porAreaPorAno) {
        areaData = porAreaPorAno[parseInt(anoFiltro)] || {};
      } else {
        areaData = porArea || {};
      }
    }
    return Object.entries(areaData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [anoFiltro, somenteEfetivadas, porArea, porAreaPorAno, porAreaEfetivado, porAreaPorAnoEfetivado]);

  const tFins = dadosArea.reduce((a, [, v]) => a + v, 0);

  const cores = [
    { f: '#0d9488', bg: 'bg-teal-600' },
    { f: '#f59e0b', bg: 'bg-amber-500' },
    { f: '#06b6d4', bg: 'bg-cyan-500' },
    { f: '#6366f1', bg: 'bg-indigo-500' },
    { f: '#8b5cf6', bg: 'bg-violet-500' }
  ];

  let ac = 0;
  const segs = dadosArea.map(([, v], i) => {
    const p = tFins > 0 ? (v / tFins) * 100 : 0;
    const ini = ac;
    ac += p;
    return { ini, fim: ac, cor: cores[i]?.f || '#94a3b8' };
  });

  const maxAno = useMemo(() => {
    if (somenteEfetivadas) {
      return Math.max(...anos.map(a => porAnoEfetivado?.[a] || 0), 1);
    }
    return Math.max(...anos.map(a => porAno[a] || 0), 1);
  }, [anos, porAno, porAnoEfetivado, somenteEfetivadas]);

  const gerarLabelFiltros = () => {
    const partes = [];
    if (anoFiltro) partes.push(anoFiltro);
    if (areaFiltro) partes.push(areaFiltro);
    return partes.length > 0 ? partes.join(' | ') : null;
  };

  const labelFiltros = gerarLabelFiltros();

  const totalDemandas = useMemo(() => {
    return parlamentares.reduce((acc, p) => {
      return acc + p.planos.filter(pl => {
        const matchAno = !anoFiltro || pl.ano === parseInt(anoFiltro);
        const matchArea = !areaFiltro || pl.area_politica === areaFiltro;
        const matchEfetivado = !somenteEfetivadas || pl.valor_efetivado > 0;
        return matchAno && matchArea && matchEfetivado;
      }).length;
    }, 0);
  }, [parlamentares, anoFiltro, areaFiltro, somenteEfetivadas]);

  const textoNarrativo = useMemo(() => {
    const periodo = dadosFiltrados.labelPeriodo;
    const numMunicipios = muniF.length;
    const numParl = parlF.length;
    const tipo = somenteEfetivadas ? 'liberados' : 'planejados';

    const partePeriodo = anoFiltro ? `Em ${periodo}` : `Entre ${periodo}`;

    let parteEntes;
    if (estadoVisivel && numMunicipios > 0) {
      parteEntes = `o Estado do ES e outros ${numMunicipios} município${numMunicipios !== 1 ? 's' : ''}`;
    } else if (estadoVisivel) {
      parteEntes = 'o Estado do ES';
    } else if (numMunicipios > 0) {
      parteEntes = `${numMunicipios} município${numMunicipios !== 1 ? 's' : ''}`;
    } else {
      parteEntes = 'os entes beneficiários';
    }

    const parteArea = areaFiltro ? ` na área de ${areaFiltro}` : '';

    return `${partePeriodo}, ${parteEntes} receberam um total de ${formatarMoeda(dadosFiltrados.total)} em recursos ${tipo} de Transferências Especiais${parteArea}. Os repasses foram feitos por ${numParl} parlamentar${numParl !== 1 ? 'es' : ''} para cerca de ${totalDemandas} projetos. Confira onde esses recursos foram aplicados, no detalhamento abaixo.`;
  }, [dadosFiltrados, muniF.length, parlF.length, estadoVisivel, anoFiltro, areaFiltro, somenteEfetivadas, totalDemandas]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* HERO - Total + Narrative */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #115e59 40%, #134e4a 70%, #0c4a6e 100%)',
        boxShadow: '0 20px 40px -10px rgba(13, 78, 74, 0.3)'
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="140" stroke="url(#heroGrad)" strokeWidth="2" fill="none" />
            <circle cx="150" cy="150" r="100" stroke="url(#heroGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-4 left-[15%] w-2 h-2 bg-teal-300/20 rounded-full" />
          <div className="absolute bottom-6 right-[25%] w-3 h-3 bg-cyan-300/15 rounded-full" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 p-5 sm:p-6">
          {/* Left: Values */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <div>
                <p className="text-teal-200/70 text-xs font-medium mb-1">
                  Total {somenteEfetivadas ? 'Liberado' : 'Planejado'} ({dadosFiltrados.labelPeriodo})
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight animate-fade-in-up">
                  {formatarMoeda(dadosFiltrados.total)}
                </p>
              </div>
              <button
                onClick={() => onEfetivadosChange && onEfetivadosChange(!somenteEfetivadas)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/10 text-white text-sm font-medium transition-all"
                aria-label={somenteEfetivadas ? 'Alternar para valores planejados' : 'Alternar para valores liberados'}
              >
                {somenteEfetivadas ? (
                  <ToggleRight className="w-5 h-5 text-teal-300" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-slate-400" />
                )}
                <span className="text-xs">{somenteEfetivadas ? 'Ver Planejado' : 'Ver Liberado'}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-5 pt-3 mt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300/60" />
                <div>
                  <p className="text-teal-200/50 text-xs">Estado</p>
                  <p className="text-white text-base font-bold">{formatarMoedaCompacta(dadosFiltrados.totalEst)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <div>
                  <p className="text-teal-200/50 text-xs">Municípios</p>
                  <p className="text-white text-base font-bold">{formatarMoedaCompacta(dadosFiltrados.totalMun)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Box */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="narrative-box flex-1 bg-gradient-to-br from-teal-400/15 to-cyan-400/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-teal-300 text-xs font-semibold uppercase tracking-wider">Em resumo</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {textoNarrativo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Bar Chart - Year Distribution */}
        <div className="lg:col-span-3">
          <Card className="p-4 h-full">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-500" />
                <h3 className="text-sm font-bold text-slate-800">Por Ano</h3>
              </div>
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => onAnoChange(null)}
                  className={`filter-chip px-2.5 py-1 text-xs rounded-lg font-medium ${
                    !anoFiltro ? 'filter-chip-active' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Todos
                </button>
                {anos.map(a => (
                  <button
                    key={a}
                    onClick={() => onAnoChange(a)}
                    className={`filter-chip px-2.5 py-1 text-xs rounded-lg font-medium ${
                      anoFiltro === a ? 'filter-chip-active' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-slate-400" />
                <span className="text-xs text-slate-500">Estado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded" style={{ background: 'linear-gradient(90deg, #0d9488, #06b6d4)' }} />
                <span className="text-xs text-slate-500">Municípios</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {anos.map(ano => {
                const vEstado = somenteEfetivadas
                  ? (porAnoEstadoEfetivado?.[ano] || 0)
                  : (porAnoEstado?.[ano] || 0);
                const vMunicipios = somenteEfetivadas
                  ? (porAnoMunicipiosEfetivado?.[ano] || 0)
                  : (porAnoMunicipios?.[ano] || 0);
                const vTotal = vEstado + vMunicipios;
                const pTotal = maxAno > 0 ? (vTotal / maxAno) * 100 : 0;
                const pEstado = vTotal > 0 ? (vEstado / vTotal) * 100 : 0;
                const pMunicipios = vTotal > 0 ? (vMunicipios / vTotal) * 100 : 0;
                const isSelected = anoFiltro === ano;

                return (
                  <div
                    key={ano}
                    onClick={() => onAnoChange(anoFiltro === ano ? null : ano)}
                    className={`cursor-pointer transition-all rounded-lg p-1.5 -mx-1.5 ${
                      isSelected ? 'bg-teal-50 ring-2 ring-teal-400' : 'hover:bg-slate-50'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Ano ${ano}: ${formatarMoedaCompacta(vTotal)}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAnoChange(anoFiltro === ano ? null : ano); } }}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold w-10 ${isSelected ? 'text-teal-700' : 'text-slate-600'}`}>
                        {ano}
                      </span>
                      <div className="flex-1 relative">
                        <div className="h-7 bg-slate-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full rounded-lg flex"
                            style={{ width: Math.max(pTotal, 18) + '%' }}
                          >
                            {pEstado > 0 && (
                              <div
                                className="h-full bg-slate-400 transition-all duration-300"
                                style={{ width: pEstado + '%' }}
                              />
                            )}
                            {pMunicipios > 0 && (
                              <div
                                className="h-full transition-all duration-300"
                                style={{
                                  width: pMunicipios + '%',
                                  background: 'linear-gradient(90deg, #0d9488, #06b6d4)'
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="absolute inset-y-0 flex items-center justify-end pr-2"
                            style={{ width: Math.max(pTotal, 18) + '%' }}
                          >
                            <span className="text-xs font-bold text-white drop-shadow-sm">
                              {formatarMoedaCompacta(vTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Total</span>
              <span className="text-lg font-extrabold text-slate-800">{formatarMoedaCompacta(dadosFiltrados.total)}</span>
            </div>
          </Card>
        </div>

        {/* Donut Chart - Area Distribution */}
        <div className="lg:col-span-2">
          <Card className="p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Por Área</h3>
              {areaFiltro && (
                <button
                  onClick={() => onAreaChange && onAreaChange(null)}
                  className="text-xs text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                >
                  Limpar filtro
                </button>
              )}
            </div>
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                {segs.map((s, i) => {
                  const r = 38;
                  const c = 2 * Math.PI * r;
                  return (
                    <circle
                      key={i}
                      className="donut-segment"
                      cx="50"
                      cy="50"
                      r={r}
                      fill="none"
                      stroke={s.cor}
                      strokeWidth="16"
                      strokeDasharray={((s.fim - s.ini) / 100) * c + ' ' + c}
                      strokeDashoffset={-(s.ini / 100) * c}
                      onClick={() => onAreaChange && onAreaChange(areaFiltro === dadosArea[i]?.[0] ? null : dadosArea[i]?.[0])}
                    />
                  );
                })}
                <text x="50" y="46" textAnchor="middle" className="fill-slate-800" style={{ fontSize: '9px', fontWeight: 800, transform: 'rotate(90deg)', transformOrigin: '50px 50px' }}>
                  {formatarMoedaCompacta(tFins)}
                </text>
                <text x="50" y="57" textAnchor="middle" className="fill-slate-400" style={{ fontSize: '4.5px', transform: 'rotate(90deg)', transformOrigin: '50px 50px' }}>
                  Total
                </text>
              </svg>
            </div>
            <div className="space-y-1">
              {dadosArea.map(([f, v], i) => {
                const isSelected = areaFiltro === f;
                return (
                  <div
                    key={f}
                    onClick={() => onAreaChange && onAreaChange(areaFiltro === f ? null : f)}
                    className={`flex items-center gap-2 cursor-pointer p-1.5 -mx-1.5 rounded-lg transition-all ${
                      isSelected ? 'bg-teal-50 ring-2 ring-teal-400' : 'hover:bg-slate-50'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${f}: ${tFins > 0 ? ((v / tFins) * 100).toFixed(0) : 0}%`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAreaChange && onAreaChange(areaFiltro === f ? null : f); } }}
                  >
                    <div className={'w-2.5 h-2.5 rounded-full flex-shrink-0 ' + (cores[i]?.bg || 'bg-slate-400')} />
                    <span className={`text-xs flex-1 truncate ${isSelected ? 'text-teal-700 font-semibold' : 'text-slate-600'}`}>
                      {f}
                    </span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-teal-700' : 'text-slate-800'}`}>
                      {tFins > 0 ? ((v / tFins) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Active Filters Badge */}
      {(anoFiltro || areaFiltro || !somenteEfetivadas) && (
        <div className="flex items-center gap-2 flex-wrap animate-fade-in">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Filtros:</span>
          {anoFiltro && (
            <span className="px-2.5 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-semibold">
              {anoFiltro}
            </span>
          )}
          {areaFiltro && (
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
              {areaFiltro}
            </span>
          )}
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-semibold">
            {somenteEfetivadas ? 'Liberados' : 'Planejados'}
          </span>
        </div>
      )}

      {/* Entity & Parliamentary Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Entities */}
        <Card className="overflow-hidden flex flex-col">
          <div className="p-4 border-b border-teal-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-800">Por Ente Beneficiário</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">{muniF.length + (estadoVisivel ? 1 : 0)} entes</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar ente..."
                value={buscaE}
                onChange={e => setBuscaE(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent focus:border-teal-200 transition-all"
                aria-label="Buscar ente beneficiário"
              />
            </div>
          </div>
          {estadoVisivel && estado && (
            <div
              onClick={() => onEnte(estado)}
              className="px-4 py-2.5 cursor-pointer list-item-hover border-b border-teal-50 flex items-center gap-3 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onEnte(estado); }}
            >
              <div className="p-2 bg-gradient-to-br from-[#115e59] to-[#134e4a] rounded-lg">
                <Landmark className="w-3.5 h-3.5 text-teal-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">Governo do Estado</p>
                <p className="text-xs text-slate-500">
                  {contarPlanosFiltrados(estado.planos)} plano(s)
                  {labelFiltros && <span className="text-teal-600"> | {labelFiltros}</span>}
                </p>
              </div>
              <p className="font-bold text-slate-800 text-sm">
                {formatarMoedaCompacta(calcularValorEnte(estado))}
              </p>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>
          )}
          <div className="flex-1 overflow-y-auto max-h-64">
            {muniF.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                Nenhum município encontrado com os filtros selecionados
              </div>
            ) : (
              muniF.map((m, i) => {
                const valor = calcularValorEnte(m);
                const numPlanos = contarPlanosFiltrados(m.planos);
                return (
                  <div
                    key={m.id}
                    onClick={() => onEnte(m)}
                    className={'px-4 py-2.5 cursor-pointer list-item-hover flex items-center gap-3 group ' + (i < muniF.length - 1 ? 'border-b border-teal-50/50' : '')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') onEnte(m); }}
                  >
                    <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
                      <Building className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{m.nome}</p>
                      <p className="text-xs text-slate-500">
                        {numPlanos} plano(s)
                        {labelFiltros && <span className="text-teal-600"> | {labelFiltros}</span>}
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{formatarMoedaCompacta(valor)}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Parliamentary Members */}
        <Card className="overflow-hidden flex flex-col">
          <div className="p-4 border-b border-teal-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-800">Por Parlamentar</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">{parlF.length} parlamentares</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar parlamentar..."
                value={buscaP}
                onChange={e => setBuscaP(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent focus:border-indigo-200 transition-all"
                aria-label="Buscar parlamentar"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-64">
            {parlF.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                Nenhum parlamentar encontrado com os filtros selecionados
              </div>
            ) : (
              parlF.map((p, i) => {
                const valor = calcularValorParlamentar(p);
                const numPlanos = contarPlanosFiltrados(p.planos);
                const numEntes = new Set(
                  p.planos
                    .filter(pl => {
                      const matchAno = !anoFiltro || pl.ano === parseInt(anoFiltro);
                      const matchArea = !areaFiltro || pl.area_politica === areaFiltro;
                      const matchEfetivado = !somenteEfetivadas || pl.valor_efetivado > 0;
                      return matchAno && matchArea && matchEfetivado;
                    })
                    .map(pl => pl.nome_beneficiario)
                ).size;
                const fotoUrl = getFotoParlamentar(p.nome);
                return (
                  <div
                    key={p.nome}
                    onClick={() => onParlamentar(p)}
                    className={'px-4 py-2.5 cursor-pointer list-item-hover flex items-center gap-3 group ' + (i < parlF.length - 1 ? 'border-b border-teal-50/50' : '')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') onParlamentar(p); }}
                  >
                    {fotoUrl ? (
                      <img
                        src={fotoUrl}
                        alt={p.nome}
                        className="w-9 h-9 rounded-lg object-cover shadow-sm flex-shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = ''; }}
                      />
                    ) : null}
                    <div
                      className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm flex-shrink-0"
                      style={fotoUrl ? { display: 'none' } : undefined}
                    >
                      <Users className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{p.nome}</p>
                      <p className="text-xs text-slate-500">
                        {numPlanos} plano(s) - {numEntes} ente(s)
                        {labelFiltros && <span className="text-indigo-600"> | {labelFiltros}</span>}
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{formatarMoedaCompacta(valor)}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
