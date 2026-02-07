export default function Linha({ label, valor, mono = false }) {
  const classes = mono
    ? "text-sm text-slate-800 text-right font-mono"
    : "text-sm text-slate-800 text-right";
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-teal-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={classes}>
        {valor || '-'}
      </span>
    </div>
  );
}
