import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Building2, Landmark, Building, ArrowRight, ToggleLeft, ToggleRight, BookOpen, Calendar, User, Users, MapPin, Tag, FileText, Banknote, CreditCard } from 'lucide-react';
import Card from '../components/ui/Card';
import { BtnVoltar, Loading } from '../components/ui';
import { formatarMoeda, formatarMoedaCompacta } from '../utils/formatters';
import { getSituacaoTrabalho } from '../utils/helpers';
import { fetchEnteCompleto } from '../services/api';
import { getBrasaoUrl } from '../utils/entityImages';
import { getFotoParlamentar } from '../utils/deputyPhotos';

export default function PaginaEnte({ ente, anoInicial, areaInicial, somenteEfetivadas, onVoltar, onExec }) {
  const [ano, setAno] = useState(anoInicial || null);
  const [areaFiltro, setAreaFiltro] = useState(areaInicial || null);
  const [enteCompleto, setEnteCompleto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarEfetivadas, setMostrarEfetivadas] = useState(somenteEfetivadas);
  const [brasaoErr, setBrasaoErr] = useState(false);

  useEffect(() => {
    async function carregarExecutores() {
      setLoading(true);
      try {
        const completo = await fetchEnteCompleto(ente);
        setEnteCompleto(completo);
      } catch (error) {
        console.error('Erro ao carregar executores:', error);
        setEnteCompleto(ente);
      }
      setLoading(false);
    }
    carregarExecutores();
  }, [ente]);

  const anosD = Object.keys(ente.anos).sort();
  const brasaoUrl = getBrasaoUrl(ente.nome);

  const total = useMemo(() => {
    if (ano) {
      if (mostrarEfetivadas) {
        return ente.anosEfetivados?.[ano] || 0;
      }
      return ente.anos?.[ano] || 0;
    }
    if (mostrarEfetivadas) {
      return Object.values(ente.anosEfetivados || {}).reduce((a, b) => a + b, 0);
    }
    return Object.values(ente.anos).reduce((a, b) => a + b, 0);
  }, [ente, ano, mostrarEfetivadas]);

  const maxAno = useMemo(() => {
    if (mostrarEfetivadas) {
      return Math.max(...Object.values(ente.anosEfetivados || {}), 1);
    }
    return Math.max(...Object.values(ente.anos), 1);
  }, [ente, mostrarEfetivadas]);

  const dadosArea = useMemo(() => {
    const planos = enteCompleto?.planos || ente.planos || [];
    const areaMap = {};
    planos.forEach(p => {
      if (ano && p.ano !== parseInt(ano)) return;
      const area = p.area_politica || 'Outros';
      const valor = mostrarEfetivadas ? (p.valor_efetivado || 0) : p.valor_total;
      areaMap[area] = (areaMap[area] || 0) + valor;
    });
    return Object.entries(areaMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [ente, enteCompleto, ano, mostrarEfetivadas]);

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

  const planosF = useMemo(() => {
    let lista = enteCompleto?.planos || ente.planos;
    if (ano) {
      lista = lista.filter(p => p.ano === parseInt(ano));
    }
    if (areaFiltro) {
      lista = lista.filter(p => p.area_politica === areaFiltro);
    }
    return lista;
  }, [ente, enteCompleto, ano, areaFiltro]);

  const execs = useMemo(() => {
    let lista = planosF.flatMap(p =>
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
      lista = lista.filter(e => e.vT > 0);
    }
    return lista.sort((a, b) => b.vT - a.vT);
  }, [planosF, mostrarEfetivadas]);

  const numParlamentares = useMemo(() => {
    let lista = enteCompleto?.planos || ente.planos;
    if (ano) lista = lista.filter(p => p.ano === parseInt(ano));
    if (areaFiltro) lista = lista.filter(p => p.area_politica === areaFiltro);
    if (mostrarEfetivadas) lista = lista.filter(p => (p.valor_efetivado || 0) > 0);
    return new Set(lista.map(p => p.parlamentar).filter(Boolean)).size;
  }, [ente, enteCompleto, ano, areaFiltro, mostrarEfetivadas]);

  const numProjetos = useMemo(() => {
    let lista = enteCompleto?.planos || ente.planos;
    if (ano) lista = lista.filter(p => p.ano === parseInt(ano));
    if (areaFiltro) lista = lista.filter(p => p.area_politica === areaFiltro);
    if (mostrarEfetivadas) lista = lista.filter(p => (p.valor_efetivado || 0) > 0);
    return lista.length;
  }, [ente, enteCompleto, ano, areaFiltro, mostrarEfetivadas]);

  // Agrupar planos por parlamentar (útil quando não há executores cadastrados, ex: 2026)
  const planosPorParlamentar = useMemo(() => {
    const map = {};
    planosF.forEach(p => {
      const parl = p.parlamentar || 'Não informado';
      if (!map[parl]) {
        map[parl] = { nome: parl, planos: [], total: 0 };
      }
      const valor = mostrarEfetivadas ? (p.valor_efetivado || 0) : p.valor_total;
      if (mostrarEfetivadas && valor <= 0) return;
      map[parl].planos.push(p);
      map[parl].total += valor;
    });
    return Object.values(map).filter(p => p.planos.length > 0).sort((a, b) => b.total - a.total);
  }, [planosF, mostrarEfetivadas]);

  const labelPeriodo = ano ? ano : `${anosD[0]}-${anosD[anosD.length - 1]}`;

  const nomeExibicao = useMemo(() => {
    let n = ente.nome;
    n = n.replace(/^MUNICIPIO DE\s+/i, '');
    n = n.replace(/^ESTADO D[OE]\s+/i, '');
    return n;
  }, [ente.nome]);

  const textoNarrativo = useMemo(() => {
    const tipo = mostrarEfetivadas ? 'repassados' : 'empenhados';
    const partePeriodo = ano ? `Em ${ano}` : `Entre ${labelPeriodo}`;
    const areas = dadosArea.slice(0, 3).map(([f]) => f).join(', ');

    return `${partePeriodo}, ${nomeExibicao} recebeu um total de ${formatarMoeda(total)} em recursos ${tipo} de Transferências Especiais. ${numParlamentares} parlamentar${numParlamentares !== 1 ? 'es' : ''} destinaram recursos para ${numProjetos} projeto${numProjetos !== 1 ? 's' : ''}${areas ? `, nas áreas de ${areas}` : ''}. Confira abaixo o detalhamento de cada projeto.`;
  }, [nomeExibicao, total, numParlamentares, numProjetos, dadosArea, labelPeriodo, ano, mostrarEfetivadas]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Context Card */}
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #115e59 40%, #134e4a 70%, #0c4a6e 100%)',
        boxShadow: '0 20px 40px -10px rgba(13, 78, 74, 0.3)'
      }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute -top-10 -right-10 w-48 h-48 opacity-10" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#5eead4" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
          <div className="absolute top-4 left-[15%] w-2 h-2 bg-teal-300/20 rounded-full" />
        </div>

        <div className="relative p-5 sm:p-6">
          <BtnVoltar onClick={onVoltar} texto="Voltar a visao geral" light />

          <div className="flex flex-wrap items-center gap-4 mt-1 mb-4">
            {brasaoUrl && !brasaoErr ? (
              <img
                src={brasaoUrl}
                alt={`Brasão de ${nomeExibicao}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-white/10 p-1.5 border border-white/20"
                onError={() => setBrasaoErr(true)}
              />
            ) : (
              <div className={'p-3 rounded-2xl border border-white/20 bg-white/10'}>
                {ente.tipo === 'estado'
                  ? <Landmark className="w-7 h-7 text-teal-300" />
                  : <Building className="w-7 h-7 text-teal-300" />
                }
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{ente.nome}</h2>
              <p className="text-teal-200/60 text-sm">CNPJ: {ente.cnpj}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left: Values */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <div>
                  <p className="text-teal-200/70 text-xs font-medium mb-1">
                    Total {mostrarEfetivadas ? 'Repassado' : 'Empenhado'} ({labelPeriodo})
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {formatarMoeda(total)}
                  </p>
                </div>
                <button
                  onClick={() => setMostrarEfetivadas(!mostrarEfetivadas)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/10 text-white text-sm font-medium transition-all"
                >
                  {mostrarEfetivadas ? <ToggleRight className="w-5 h-5 text-teal-300" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                  <span className="text-xs">{mostrarEfetivadas ? 'Ver Empenhado' : 'Ver Repassado'}</span>
                </button>
              </div>
            </div>

            {/* Right: Narrative "Em resumo" */}
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
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <Card className="p-4 h-full">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-500" />
                <h3 className="text-sm font-bold text-slate-800">Transferencias por Ano</h3>
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
                const v = mostrarEfetivadas ? (ente.anosEfetivados?.[a] || 0) : ente.anos[a];
                const p = maxAno > 0 ? (v / maxAno) * 100 : 0;
                const sel = !ano || ano === a;
                return (
                  <div key={a} className="group">
                    <div className="flex items-center gap-3">
                      <span className={'text-xs font-bold w-10 ' + (sel ? 'text-slate-700' : 'text-slate-400')}>{a}</span>
                      <div className="flex-1 relative">
                        <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                          <div
                            className={'h-full rounded-lg relative overflow-hidden transition-all duration-300 ' + (sel ? '' : 'opacity-30')}
                            style={{
                              width: Math.max(p, 5) + '%',
                              background: sel ? 'linear-gradient(90deg, #0d9488, #06b6d4)' : '#94a3b8'
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
                  className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
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
                          isSelected ? 'bg-teal-50 ring-2 ring-teal-400' : 'hover:bg-slate-50'
                        }`}
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
              </>
            ) : (
              <div className="text-center text-slate-400 py-8 text-sm">
                Nenhum dado de area disponivel
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Executor Projects OR Parliamentary Allocations (when no executors) */}
      {loading ? (
        <Card className="p-5"><Loading /></Card>
      ) : execs.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-teal-50 bg-gradient-to-r from-teal-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-xl">
                <Building2 className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Projetos por Executor</h3>
                <p className="text-xs text-slate-500">
                  {execs.length} projeto(s) encontrado(s)
                  {areaFiltro && ` em ${areaFiltro}`}
                </p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {execs.map((ex, i) => {
              const sit = getSituacaoTrabalho(ex.situacao_plano_trabalho);
              return (
                <div
                  key={ex.id + '-' + i}
                  onClick={() => onExec(ex)}
                  className="p-4 cursor-pointer group hover:bg-teal-50/30 transition-all"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl flex items-center justify-center font-extrabold text-sm shadow-sm">
                      #{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-semibold text-slate-800 text-sm leading-snug flex-1 group-hover:text-teal-700 transition-colors">
                          {ex.detalhamento_objeto || ex.objeto || 'Objeto nao informado'}
                        </p>
                        <div className="text-right flex-shrink-0">
                          <p className="text-base font-extrabold text-teal-700">{formatarMoedaCompacta(ex.vT)}</p>
                          <p className="text-[10px] text-slate-400">{mostrarEfetivadas ? 'repassado' : 'empenhado'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                          <Calendar className="w-3 h-3" />
                          {ex.plano.ano}
                        </span>
                        {ex.plano.parlamentar && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                            <User className="w-3 h-3" />
                            {ex.plano.parlamentar}
                          </span>
                        )}
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
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 ml-auto flex-shrink-0 transition-all group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : planosF.length > 0 ? (
        /* Indicações Parlamentares - quando planos existem mas executores ainda não foram cadastrados */
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-teal-50 bg-gradient-to-r from-indigo-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Indicacoes Parlamentares</h3>
                <p className="text-xs text-slate-500">
                  {planosF.length} emenda(s) de {planosPorParlamentar.length} parlamentar(es)
                  {areaFiltro && ` em ${areaFiltro}`}
                </p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {planosPorParlamentar.map(grupo => {
              const fotoParl = getFotoParlamentar(grupo.nome);
              return (
                <div key={grupo.nome}>
                  {/* Header do parlamentar com foto */}
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-50/80 to-slate-50/50 flex items-center gap-3">
                    {fotoParl ? (
                      <img
                        src={fotoParl}
                        alt={grupo.nome}
                        className="w-10 h-10 rounded-xl object-cover shadow-sm border border-indigo-100 flex-shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = ''; }}
                      />
                    ) : null}
                    <div
                      className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm flex-shrink-0"
                      style={fotoParl ? { display: 'none' } : undefined}
                    >
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800">{grupo.nome}</p>
                      <p className="text-xs text-slate-500">{grupo.planos.length} emenda{grupo.planos.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-extrabold text-indigo-700">{formatarMoedaCompacta(grupo.total)}</p>
                      <p className="text-[10px] text-slate-400">{mostrarEfetivadas ? 'repassado' : 'empenhado'}</p>
                    </div>
                  </div>

                  {/* Cards de emendas */}
                  <div className="px-4 py-2 space-y-2">
                    {grupo.planos.map((p, i) => {
                      const valor = mostrarEfetivadas ? (p.valor_efetivado || 0) : p.valor_total;
                      const sitLabel = p.situacao === 'CIENTE' ? 'Ciente'
                        : p.situacao === 'AGUARDANDO_CIENCIA' ? 'Aguardando Ciencia'
                        : p.situacao === 'AGUARDANDO_CONCLUSAO_PLANO_TRABALHO' ? 'Aguardando Plano de Trabalho'
                        : p.situacao === 'IMPEDIDO' ? 'Impedido'
                        : p.situacao?.replace(/_/g, ' ') || 'Pendente';
                      const sitColor = p.situacao === 'CIENTE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : p.situacao === 'IMPEDIDO' ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200';

                      return (
                        <div key={p.id || i} className="bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all p-3.5">
                          {/* Linha superior: emenda + valor */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <FileText className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                                <p className="text-sm font-semibold text-slate-800 truncate">
                                  Emenda {p.numero_emenda || p.codigo}
                                </p>
                              </div>
                              <span className={'inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ' + sitColor}>
                                {sitLabel}
                              </span>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-lg font-extrabold text-indigo-700">{formatarMoedaCompacta(valor)}</p>
                            </div>
                          </div>

                          {/* Detalhes: custeio + investimento */}
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="bg-slate-50 rounded-lg px-2.5 py-1.5">
                              <p className="text-[10px] text-slate-400 font-medium">Custeio</p>
                              <p className="text-xs font-bold text-slate-700">{formatarMoedaCompacta(p.valor_custeio || 0)}</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg px-2.5 py-1.5">
                              <p className="text-[10px] text-slate-400 font-medium">Investimento</p>
                              <p className="text-xs font-bold text-slate-700">{formatarMoedaCompacta(p.valor_investimento || 0)}</p>
                            </div>
                          </div>

                          {/* Dados bancários */}
                          {p.banco && (
                            <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-lg px-2.5 py-2 mb-2">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Banknote className="w-3 h-3 text-slate-400" />
                                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Dados Bancarios</p>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-0.5">
                                <div>
                                  <p className="text-[10px] text-slate-400">Banco</p>
                                  <p className="text-xs font-medium text-slate-700 truncate">{p.banco}</p>
                                </div>
                                {p.agencia && (
                                  <div>
                                    <p className="text-[10px] text-slate-400">Agencia</p>
                                    <p className="text-xs font-medium text-slate-700">{p.agencia}</p>
                                  </div>
                                )}
                                {p.conta && (
                                  <div>
                                    <p className="text-[10px] text-slate-400">Conta</p>
                                    <p className="text-xs font-medium text-slate-700">{p.conta}</p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-[10px] text-slate-400">Situacao</p>
                                  <p className="text-xs font-medium text-emerald-600">{p.situacao_conta || 'Ativa'}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Tags: ano + área */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                              <Calendar className="w-3 h-3" />
                              {p.ano}
                            </span>
                            {p.area_politica && p.area_politica !== 'Outros' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-medium">
                                <Tag className="w-3 h-3" />
                                {p.area_politica}
                              </span>
                            )}
                            {!p.banco && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-xs font-medium">
                                <CreditCard className="w-3 h-3" />
                                Conta pendente
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center text-slate-400 text-sm">
          Nenhum dado encontrado para este filtro.
        </Card>
      )}
    </div>
  );
}
