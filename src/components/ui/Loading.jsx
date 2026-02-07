export default function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-teal-100" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-500 animate-spin" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-slate-600 text-sm font-medium">Carregando dados...</p>
          <p className="text-slate-400 text-xs">Consultando TransfereGov</p>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-teal-100/50" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="skeleton h-4 w-24 mb-3" />
      <div className="skeleton h-8 w-48 mb-2" />
      <div className="skeleton h-3 w-32" />
    </div>
  );
}

export function SkeletonList({ rows = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
          <div className="skeleton h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
