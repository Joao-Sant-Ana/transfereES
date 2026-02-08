import { HelpCircle } from 'lucide-react';

function HeroBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-10" viewBox="0 0 400 400" fill="none">
        <path d="M300 100c55 45 90 110 60 170s-110 80-180 90-140-20-150-80 30-100 70-140S245 55 300 100z" fill="url(#blob1)" />
        <defs>
          <linearGradient id="blob1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute top-4 left-10 w-48 h-24 opacity-[0.07]" viewBox="0 0 200 100" fill="none">
        <ellipse cx="60" cy="60" rx="50" ry="30" fill="white" />
        <ellipse cx="100" cy="50" rx="60" ry="35" fill="white" />
        <ellipse cx="150" cy="58" rx="45" ry="28" fill="white" />
      </svg>
      <svg className="absolute top-8 right-40 w-36 h-20 opacity-[0.05]" viewBox="0 0 200 100" fill="none">
        <ellipse cx="70" cy="55" rx="55" ry="32" fill="white" />
        <ellipse cx="130" cy="50" rx="50" ry="30" fill="white" />
      </svg>
      <div className="absolute top-6 right-[30%] w-3 h-3 bg-teal-300/20 rounded-full" />
      <div className="absolute top-14 right-[20%] w-2 h-2 bg-cyan-300/15 rounded-full" />
      <div className="absolute bottom-4 left-[25%] w-4 h-4 bg-teal-200/10 rounded-full" />
    </div>
  );
}

export default function Header({ onAjuda }) {
  return (
    <header className="hero-bg">
      <HeroBlobs />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-900/30 border border-white/20 flex-shrink-0">
              <span className="text-white font-extrabold text-base tracking-tight">ES</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">TransfereES</h1>
              <p className="text-xs text-teal-200/70 leading-tight">Portal de Transferências Especiais</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onAjuda}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/10 text-white text-sm font-medium transition-all"
              aria-label="Como funciona o portal"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Como funciona?</span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-xs text-teal-200/50">Fonte: TransfereGov</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full h-4 sm:h-5" preserveAspectRatio="none">
          <path d="M0 40V20C240 0 480 0 720 20C960 40 1200 40 1440 20V40H0Z" fill="#f0fdfa" />
        </svg>
      </div>
    </header>
  );
}
