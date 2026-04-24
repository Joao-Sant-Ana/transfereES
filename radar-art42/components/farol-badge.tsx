import type { FarolStatus } from '@/types/financeiro';

const labelMap: Record<FarolStatus, string> = {
  verde: 'Verde',
  amarelo: 'Amarelo',
  vermelho: 'Vermelho',
  cinza: 'Cinza'
};

const classMap: Record<FarolStatus, string> = {
  verde: 'bg-emerald-100 text-emerald-800',
  amarelo: 'bg-amber-100 text-amber-800',
  vermelho: 'bg-red-100 text-red-800',
  cinza: 'bg-slate-200 text-slate-700'
};

export function FarolBadge({ status }: { status: FarolStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${classMap[status]}`}>
      {labelMap[status]}
    </span>
  );
}
