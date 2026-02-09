import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, Building2, Users, Landmark, Building, ArrowRight, ChevronDown, ToggleLeft, ToggleRight, BookOpen, Calendar, MapPin, Tag } from 'lucide-react';
import Card from '../components/ui/Card';
import { BtnVoltar, Loading } from '../components/ui';
import { formatarMoeda, formatarMoedaCompacta } from '../utils/formatters';
import { getSituacaoTrabalho } from '../utils/helpers';
import { fetchEnteCompleto } from '../services/api';
import { getFotoParlamentar } from '../utils/deputyPhotos';
import { getBrasaoUrl } from '../utils/entityImages';

export default function PaginaParlamentar({ parl, anoInicial, areaInicial, somenteEfetivadas, onVoltar, onExec }) {
  const [ano, setAno] = useState(anoInicial || null);
  const [areaFiltro, setAreaFiltro] = useState(areaInicial || null);
  const [enteExp, setEnteExp] = useState(null);
  const [entesComExecutores, setEntesComExecutores] = useState({});
  const [loadingEnte, setLoadingEnte] = useState(null);
  const [mostrarEfetivadas, setMostrarEfetivadas] = useState(somenteEfetivadas);
  const [brasaoErrs, setBrasaoErrs] = useState({});

  const anosD = Object.keys(parl.anos).sort();
  const fotoUrl = getFotoParlamentar(parl.nome);

  const total = useMemo(() => {
    if (ano) {
      if (mostrarEfetivadas) {
        return parl.anosEfetivados?.[ano] || 0;
      }
      return parl.anos?.[ano] || 0;
    }
    if (mostrarEfetivadas) {
      return parl.totalEfetivado || 0;
    }
    return parl.total;
  }, [parl, ano, mostrarEfetivadas]);

  const maxAno = useMemo(() => {
    if (mostrarEfetivadas) {
      return Math.max(...Object.values(parl.anosEfetivados || {}), 1);
    }
    return Math.max(...Object.values(parl.anos), 1);
  }, [parl, mostrarEfetivadas]);

  const dadosArea = useMemo(() => {
    const areaMap = {};
    parl.planos.forEach(p => {
      if (ano && p.ano !== parseInt(ano)) return;
      const area = p.area_politica || 'Outros';
      const valor = mostrarEfetivadas ? (p.valor_efetivado || 0) : p.valor_total;
      areaMap[area] = (areaMap[area] || 0) + valor;
    });
    return Object.entries(areaMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [parl, ano, mostrarEfetivadas]);

  const tFins = dadosArea.reduce((a, [, v]) => a + v, 0);

  const cores = [
    { f: '#6366f1', bg: 'bg-indigo-500' },
    { f: '#8b5cf6', bg: 'bg-violet-500' },
    { f: '#0d9488', bg: 'bg-teal-600' },
    { f: '#f59e0b', bg: 'bg-amber-500' },
    { f: '#06b6d4', bg: 'bg-cyan-500' }
  ];

  let ac = 0;
  const segs = dadosArea.map(([, v], i) => {
    const p = tFins > 0 ? (v / tFins) * 100 : 0;
    const ini = ac;
    ac += p;
    return { ini, fim: ac, cor: cores[i]?.f || '#94a3b8' };
  });

  const entesAgregados = useMemo(() => {
    const map = {};
    parl.planos.forEach(plano => {
      const key = plano.cnpj_beneficiario;
      if (!key) return;

      if (ano && plano.ano !== parseInt(ano)) return;
      if (areaFiltro && plano.area_politica !== areaFiltro) return;

      const valorEfetivado = plano.valor_efetivado || 0;
      if (mostrarEfetivadas && valorEfetivado <= 0) return;

      if (!map[key]) {
        map[key] = {
          cnpj: key,
          nome: plano.nome_beneficiario || 'Nao informado',
          tipo: (plano.tipo_beneficiario || 'MUNICIPIO').toLowerCase() === 'estado' ? 'estado' : 'municipio',
          planos: [],
          total: 0
        };
      }
      map[key].planos.push(plano);
      map[key].total += mostrarEfetivadas ? valorEfetivado : (plano.valor_total || 0);
    });
    return Object.values(map).filter(e => e.planos.length > 0).sort((a, b) => b.total - a.total);
  }, [parl, ano, areaFiltro, mostrarEfetivadas]);

  const totalEstadoParl = useMemo(() => {
    return entesAgregados.filter(e => e.tipo === 'estado').reduce((acc, e) => acc + e.total, 0);
  }, [entesAgregados]);

  const totalMunicipiosParl = useMemo(() => {
    return entesAgregados.filter(e => e.tipo !== 'estado').reduce((acc, e) => acc + e.total, 0);
  }, [entesAgregados]);

  const numEntes = entesAgregados.length;
  const labelPeriodo = ano ? ano : `${anosD[0]}-${anosD[anosD.length - 1]}`;

  const totalPlanosFiltr = useMemo(() => {
    return parl.planos.filter(p => {
      if (ano && p.ano !== parseInt(ano)) return false;
      if (areaFiltro && p.area_politica !== areaFiltro) return false;
      if (mostrarEfetivadas && !(p.valor_efetivado > 0)) return false;
      return true;
    }).length;
  }, [parl, ano, areaFiltro, mostrarEfetivadas]);

  const textoNarrativo = useMemo(() => {
    const tipo = mostrarEfetivadas ? 'liberados' : 'planejados';
    const partePeriodo = ano ? `Em ${ano}` : `Entre ${labelPeriodo}`;
    const areas = dadosArea.slice(0, 3).map(([f]) => f).join(', ');

    return `${partePeriodo}, ${parl.nome} destinou um total de ${formatarMoeda(total)} em recursos ${tipo} de Transferências Especiais para ${numEntes} ente${numEntes !== 1 ? 's' : ''} beneficiário${numEntes !== 1 ? 's' : ''}. Os recursos contemplam ${totalPlanosFiltr} projeto${totalPlanosFiltr !== 1 ? 's' : ''}${areas ? `, nas áreas de ${areas}` : ''}. Confira abaixo o detalhamento por ente.`;
  }, [parl.nome, total, numEntes, totalPlanosFiltr, dadosArea, labelPeriodo, ano, mostrarEfetivadas]);

  useEffect(() => {
    async function carregarExecutores() {
      if (!enteExp) return;
      const ente = entesAgregados.find(e => e.cnpj === enteExp);
      if (!ente || entesComExecutores[enteExp]) return;

      setLoadingEnte(enteExp);
      try {
        const enteCompleto = await fetchEnteCompleto(ente);
        setEntesComExecutores(prev => ({
          ...prev,
          [enteExp]: enteCompleto.planos
        }));
      } catch (error) {
        console.error('Erro ao carregar executores:', error);
      }
      setLoadingEnte(null);
    }
    carregarExecutores();
  }, [enteExp, entesAgregados, entesComExecutores]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Context Card */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #312e81 0%, #3730a3 30%, #4338ca 60%, #4f46e5 100%)',
        boxShadow: '0 20px 40px -10px rgba(49, 46, 129, 0.3)'
      }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute -top-10 -right-10 w-48 h-48 opacity-10" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#a5b4fc" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="#a5b4fc" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
          <div className="absolute top-6 left-[20%] w-2 h-2 bg-indigo-300/20 rounded-full" />
          <div className="absolute bottom-8 right-[30%] w-3 h-3 bg-violet-300/15 rounded-full" />
        </div>

        <div className="relative p-5 sm:p-6">
          <BtnVoltar onClick={onVoltar} texto="Voltar a visao geral" light />

          <div className="flex flex-wrap items-center gap-4 mt-1">
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt={parl.nome}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg border-2 border-white/20"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = ''; }}
              />
            ) : null}
            <div
              className="p-4 bg-white/10 rounded-2xl border border-white/20"
              style={fotoUrl ? { display: 'none' } : undefined}
            >
              <Users className="w-8 h-8 text-indigo-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{parl.nome}</h2>
              <p className="text-indigo-200/70 text-sm">{parl.planos.length} plano(s) de acao - {numEntes} ente(s) beneficiados</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-indigo-200/70 text-xs font-medium mb-1">
                Total {mostrarEfetivadas ? 'Liberado' : 'Planejado'} ({labelPeriodo})
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatarMoeda(total)}
              </p>
            </div>
            <button
              onClick={() => setMostrarEfetivadas(!mostrarEfetivadas)}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/10 text-white text-sm font-medium transition-all"
            >
              {mostrarEfetivadas ? <ToggleRight className="w-5 h-5 text-indigo-300" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
              <span className="text-xs">{mostrarEfetivadas ? 'Ver Planejado' : 'Ver Liberado'}</span>
            </button>
          </div>

          {/* Estado / Municípios breakdown */}
          <div className="flex flex-wrap gap-5 pt-3 mt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-300/60" />
              <div>
                <p className="text-indigo-200/50 text-xs">Estado</p>
                <p className="text-white text-base font-bold">{formatarMoedaCompacta(totalEstadoParl)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <div>
                <p className="text-indigo-200/50 text-xs">Municipios</p>
                <p className="text-white text-base font-bold">{formatarMoedaCompacta(totalMunicipiosParl)}</p>
              </div>
            </div>
          </div>

          {/* Narrative "Em resumo" */}
          <div className="mt-4 narrative-box bg-gradient-to-br from-indigo-400/15 to-violet-400/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wider">Em resumo</span>
            </div>
            <p className="text-white/85 text-sm leading-relaxed">
              {textoNarrativo}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <Card className="p-4 h-full">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-800">Repasses por Ano</h3>
              </div>
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setAno(null)}
                  className={'filter-chip px-2.5 py-1 text-xs rounded-lg font-medium ' + (!ano ? 'filter-chip-active' : 'bg-slate-100 text-slate-600')}
                >
                  Todos
                </button>
                {anosD.map(a => (
                  <button
                    key={a}
                    onClick={() => setAno(a)}
                    className={'filter-chip px-2.5 py-1 text-xs rounded-lg font-medium ' + (ano === a ? 'filter-chip-active' : 'bg-slate-100 text-slate-600')}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {anosD.map(a => {
                const v = mostrarEfetivadas ? (parl.anosEfetivados?.[a] || 0) : parl.anos[a];
                const p = maxAno > 0 ? (v / maxAno) * 100 : 0;
                const sel = !ano || ano === a;
                return (
                  <div key={a} className="group">
                    <div className="flex items-center gap-3">
                      <span className={'text-xs font-bold w-10 ' + (sel ? 'text-slate-700' : 'text-slate-400')}>{a}</span>
                      <div className="flex-1 relative">
                        <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                          <div
                            className={'h-full rounded-lg transition-all duration-300 ' + (sel ? '' : 'opacity-30')}
                            style={{
                              width: Math.max(p, 5) + '%',
                              background: sel ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : '#94a3b8'
                            }}
                          />
                        </div>
                        {p >= 30 ? (
                          <div className="absolute inset-y-0 flex items-center justify-end pr-2"
                            style={{ width: p + '%' }}>
                            <span className={'text-xs font-bold drop-shadow-sm ' + (sel ? 'text-white' : 'text-white/50')}>
                              {formatarMoedaCompacta(v)}
                            </span>
                          </div>
                        ) : (
                          <div className="absolute inset-y-0 flex items-center pl-2"
                            style={{ left: Math.max(p, 5) + '%' }}>
                            <span className={'text-xs font-bold ' + (sel ? 'text-slate-600' : 'text-slate-400')}>
                              {formatarMoedaCompacta(v)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Por Area</h3>
              {areaFiltro && (
                <button
                  onClick={() => setAreaFiltro(null)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Limpar filtro
                </button>
              )}
            </div>
            {dadosArea.length > 0 ? (
              <>
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
                        />
                      );
                    })}
                  </svg>
                </div>
                <div className="space-y-1">
                  {dadosArea.map(([f, v], i) => {
                    const isSelected = areaFiltro === f;
                    return (
                      <div
                        key={f}
                        onClick={() => setAreaFiltro(areaFiltro === f ? null : f)}
                        className={`flex items-center gap-2 cursor-pointer p-1.5 -mx-1.5 rounded-lg transition-all ${
                          isSelected ? 'bg-indigo-50 ring-2 ring-indigo-400' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={'w-2.5 h-2.5 rounded-full flex-shrink-0 ' + (cores[i]?.bg || 'bg-slate-400')} />
                        <span className={`text-xs flex-1 truncate ${isSelected ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}>
                          {f}
                        </span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-800'}`}>
                          {tFins > 0 ? ((v / tFins) * 100).toFixed(0) : 0}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center text-slate-400 py-8 text-sm">
                Nenhum dado de area disponivel
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Entes Beneficiados */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-teal-50 bg-gradient-to-r from-indigo-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Building2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Entes Beneficiados</h3>
              <p className="text-xs text-slate-500">
                {entesAgregados.length} ente(s) encontrado(s)
                {areaFiltro && ` em ${areaFiltro}`}
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {entesAgregados.map((ente) => {
            const brasaoUrl = getBrasaoUrl(ente.nome);
            const hasBrasaoErr = brasaoErrs[ente.cnpj];
            return (
              <div key={ente.cnpj}>
                <div
                  onClick={() => setEnteExp(enteExp === ente.cnpj ? null : ente.cnpj)}
                  className="p-4 list-item-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {brasaoUrl && !hasBrasaoErr ? (
                      <img
                        src={brasaoUrl}
                        alt={ente.nome}
                        className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-slate-200 flex-shrink-0"
                        onError={() => setBrasaoErrs(prev => ({ ...prev, [ente.cnpj]: true }))}
                      />
                    ) : (
                      <div className={'p-2 rounded-xl flex-shrink-0 ' + (ente.tipo === 'estado' ? 'bg-gradient-to-br from-[#115e59] to-[#134e4a]' : 'bg-gradient-to-br from-teal-500 to-cyan-500')}>
                        {ente.tipo === 'estado'
                          ? <Landmark className="w-4 h-4 text-teal-300" />
                          : <Building className="w-4 h-4 text-white" />
                        }
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{ente.nome}</p>
                      <p className="text-xs text-slate-500">{ente.planos.length} plano(s)</p>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{formatarMoedaCompacta(ente.total)}</p>
                    <ChevronDown className={'w-4 h-4 text-slate-400 transition-transform duration-200 ' + (enteExp === ente.cnpj ? 'rotate-180' : '')} />
                  </div>
                </div>
                {enteExp === ente.cnpj && (
                  <div className="bg-slate-50/50 border-t border-slate-100 animate-fade-in">
                    {loadingEnte === ente.cnpj ? (
                      <div className="p-4">
                        <Loading />
                      </div>
                    ) : (
                      (() => {
                        let execsList = (entesComExecutores[ente.cnpj] || ente.planos).flatMap(p =>
                          (p.executores || []).map(e => {
                            const valorPlanejado = (e.valor_custeio || 0) + (e.valor_investimento || 0);
                            const valorEfetivado = e.valor_efetivado || 0;
                            return {
                              ...e,
                              plano: p,
                              vT: mostrarEfetivadas ? valorEfetivado : valorPlanejado,
                              valorPlanejado,
                              valorEfetivado
                            };
                          })
                        );
                        if (mostrarEfetivadas) {
                          execsList = execsList.filter(e => e.vT > 0);
                        }
                        return execsList.sort((a, b) => b.vT - a.vT).map((ex, i) => {
                          const sit = getSituacaoTrabalho(ex.situacao_plano_trabalho);
                          return (
                            <div
                              key={ex.id + '-' + i}
                              onClick={() => onExec(ex)}
                              className="p-4 hover:bg-indigo-50/50 cursor-pointer border-b border-slate-100/50 last:border-0 ml-4 group transition-colors"
                            >
                              <div className="flex gap-3">
                                {/* Number badge */}
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xs shadow-sm">
                                  #{i + 1}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <p className="font-medium text-slate-800 text-sm leading-snug flex-1 group-hover:text-indigo-700 transition-colors">
                                      {ex.detalhamento_objeto || ex.objeto || ex.nome}
                                    </p>
                                    <div className="text-right flex-shrink-0">
                                      <p className="font-bold text-indigo-700 text-sm">{formatarMoedaCompacta(ex.vT)}</p>
                                      <p className="text-[10px] text-slate-400">{mostrarEfetivadas ? 'liberado' : 'planejado'}</p>
                                    </div>
                                  </div>

                                  {/* Chips row */}
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                      <Calendar className="w-3 h-3" />
                                      {ex.plano.ano}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                                      <MapPin className="w-3 h-3" />
                                      {ex.nome}
                                    </span>
                                    {ex.plano.area_politica && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-medium">
                                        <Tag className="w-3 h-3" />
                                        {ex.plano.area_politica}
                                      </span>
                                    )}
                                    <span className={'px-2 py-0.5 rounded-md text-xs font-medium ' + sit.bg + ' ' + sit.cor}>{sit.label}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 ml-auto flex-shrink-0 transition-all group-hover:translate-x-0.5" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()
                    )}
                    {!loadingEnte && (!entesComExecutores[ente.cnpj] || entesComExecutores[ente.cnpj].every(p => !p.executores?.length)) && (
                      <div className="p-4 ml-4 text-sm text-slate-400">
                        Carregando executores...
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
