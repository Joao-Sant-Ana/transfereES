export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-teal-100/50 ${hover ? 'card-hover' : ''} ${className}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {children}
    </div>
  );
}
