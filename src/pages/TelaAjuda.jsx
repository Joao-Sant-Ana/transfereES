import { BookOpen, X, Info, Banknote, MapPin, Target, TrendingUp, Scale, HelpCircle } from 'lucide-react';

export default function TelaAjuda({ onClose }) {
  const fluxoEtapas = [
    { n: 1, t: "Indicacao da Emenda", d: "Parlamentar indica recursos do orcamento federal para um ente publico especifico." },
    { n: 2, t: "Plano de Acao", d: "A indicacao se torna um Plano de Acao no sistema TransfereGov. O ente beneficiario deve dar ciencia (aceite formal)." },
    { n: 3, t: "Plano de Trabalho", d: "O ente cadastra os Planos de Trabalho, detalhando executores, objetos, metas, valores e cronograma." },
    { n: 4, t: "Analise e Aprovacao", d: "Os Ministerios setoriais analisam os planos. Apos aprovacao, o recurso e liberado." },
    { n: 5, t: "Execucao", d: "O dinheiro e depositado em conta especifica e o executor contrata e realiza as acoes previstas." },
    { n: 6, t: "Prestacao de Contas", d: "O executor registra os Relatorios de Gestao no TransfereGov, comprovando a aplicacao dos recursos." },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up" style={{ boxShadow: 'var(--shadow-xl)' }}>
        <div className="sticky top-0 z-10 p-5 rounded-t-3xl flex items-center justify-between" style={{
          background: 'linear-gradient(135deg, #0f766e 0%, #115e59 40%, #134e4a 70%, #0c4a6e 100%)'
        }}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Como funcionam as Transferencias Especiais?</h2>
              <p className="text-xs text-teal-200/60">Guia completo para o cidadao</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors" aria-label="Fechar">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" />O que sao as Transferencias Especiais?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              As Transferencias Especiais foram criadas pela <strong>Emenda Constitucional no 105/2019</strong> e regulamentadas pela <strong>Lei no 14.943/2024</strong>. Elas permitem que parlamentares federais (deputados e senadores) indiquem recursos do orcamento da Uniao diretamente para estados e municipios executarem politicas publicas, <strong>sem necessidade de convenio ou contrato de repasse</strong>.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              Os recursos pertencem ao ente beneficiario (estado ou municipio) desde a publicacao da programacao orcamentaria, devendo ser aplicados em programacoes finalisticas das areas de competencia constitucional.
            </p>
          </div>

          <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
            <h3 className="text-base font-bold text-teal-800 mb-2 flex items-center gap-2">
              <Banknote className="w-5 h-5" />De onde vem esse dinheiro?
            </h3>
            <p className="text-sm text-teal-700">
              Os recursos vem do <strong>Orcamento Geral da Uniao</strong>, atraves das chamadas <strong>emendas parlamentares individuais e de bancada</strong>. Cada parlamentar pode indicar uma parcela do orcamento para projetos de seu interesse, que serao executados por estados e municipios.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />Quem pode receber esses recursos?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-700">Estados e DF</p>
                <p className="text-xs text-slate-500">Governos estaduais e suas secretarias</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-700">Municipios</p>
                <p className="text-xs text-slate-500">Prefeituras e orgaos municipais</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              Dentro de cada ente, os <strong>Executores</strong> sao os orgaos ou entidades responsaveis pela aplicacao efetiva dos recursos (secretarias, autarquias, fundacoes publicas).
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" />Como o dinheiro pode ser usado?
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Os recursos devem ser aplicados em <strong>programacoes finalisticas</strong>, ou seja, acoes que entregam bens ou servicos diretamente a populacao, divididos em:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-700">Investimento</p>
                <p className="text-xs text-emerald-600">Obras, aquisicao de equipamentos, veiculos, construcoes (bens permanentes)</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-sm font-semibold text-amber-700">Custeio</p>
                <p className="text-xs text-amber-600">Manutencao, materiais de consumo, servicos, folha temporaria</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              <strong>Areas comuns:</strong> Saude, Educacao, Assistencia Social, Infraestrutura Urbana, Agricultura, Esporte, Cultura, Seguranca, entre outras.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />Fluxo das Transferencias
            </h3>
            <div className="space-y-3">
              {fluxoEtapas.map((e, i) => (
                <div key={e.n} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{
                      background: 'linear-gradient(135deg, #0d9488, #06b6d4)'
                    }}>
                      {e.n}
                    </div>
                    {i < 5 && <div className="w-0.5 flex-1 bg-teal-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-1">
                    <p className="font-semibold text-slate-800 text-sm">{e.t}</p>
                    <p className="text-xs text-slate-500">{e.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 text-white" style={{
            background: 'linear-gradient(135deg, #115e59, #134e4a)'
          }}>
            <h3 className="text-base font-bold mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-300" />Obrigacoes de Transparencia
            </h3>
            <p className="text-sm text-teal-100/80 leading-relaxed">
              Conforme a <strong>Lei no 14.943/2024</strong>, os entes beneficiarios devem:
            </p>
            <ul className="text-sm text-teal-100/80 mt-2 space-y-1 list-disc list-inside">
              <li>Manter os dados atualizados no sistema TransfereGov</li>
              <li>Publicar relatorios de gestao com a aplicacao dos recursos</li>
              <li>Disponibilizar informacoes em seus portais de transparencia</li>
              <li>Prestar contas aos orgaos de controle (TCU, CGU, TCE)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />Sobre este Portal
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              O <strong>TransfereES</strong> e um portal desenvolvido pela SEFAZ-ES para facilitar o acesso do cidadao as informacoes sobre as transferencias especiais recebidas pelo Estado do Espirito Santo e seus municipios.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              <strong>Informacoes disponiveis:</strong> valores transferidos, parlamentares autores das emendas, entes e executores beneficiados, objetos de execucao, metas fisicas e financeiras, situacao dos planos e dados bancarios.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-3">Como navegar neste portal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700 mb-1">Por Ente Beneficiario</p>
                <p className="text-xs text-slate-500">Escolha um estado ou municipio - veja os projetos por executor - acesse os detalhes completos de cada projeto.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-700 mb-1">Por Parlamentar</p>
                <p className="text-xs text-slate-500">Escolha um parlamentar - veja os entes beneficiados - selecione um executor - acesse os detalhes do projeto.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Onde buscar mais informacoes?</h3>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.transferegov.sistema.gov.br" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full hover:bg-teal-100 transition-colors font-medium">TransfereGov (Portal Federal)</a>
              <a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc105.htm" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium">EC 105/2019</a>
              <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14943.htm" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors font-medium">Lei 14.943/2024</a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 text-white font-semibold rounded-xl transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #0d9488, #06b6d4)',
              boxShadow: '0 4px 14px rgba(13, 148, 136, 0.3)'
            }}
          >
            Entendi, comecar a navegar
          </button>
        </div>
      </div>
    </div>
  );
}
