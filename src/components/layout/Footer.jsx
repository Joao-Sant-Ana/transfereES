export default function Footer() {
  return (
    <footer className="relative mt-12">
      <div className="overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 sm:h-8" preserveAspectRatio="none">
          <path d="M0 40V20C240 40 480 40 720 20C960 0 1200 0 1440 20V40H0Z" fill="#115e59" />
        </svg>
      </div>
      <div className="bg-[#115e59]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xs">ES</span>
            </div>
            <span className="text-white font-semibold">TransfereES</span>
          </div>
          <p className="text-teal-200/60 text-sm">
            Portal de Transferencias Especiais da EC 105/2019
          </p>
          <p className="text-teal-200/40 text-xs mt-2">
            Fonte: API TransfereGov &middot; SEFAZ-ES &middot; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
