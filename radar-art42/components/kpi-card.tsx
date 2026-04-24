interface KPIProps {
  titulo: string;
  valor: string;
  descricao: string;
}

export function KPICard({ titulo, valor, descricao }: KPIProps) {
  return (
    <article className="rounded-xl border border-institucional-border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{titulo}</p>
      <p className="mt-2 text-2xl font-semibold text-institucional-navy">{valor}</p>
      <p className="mt-2 text-xs text-slate-500">{descricao}</p>
    </article>
  );
}
