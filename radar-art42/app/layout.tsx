import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radar Art. 42',
  description: 'Monitoramento do cumprimento do art. 42 da LRF no Poder Executivo Estadual.'
};

const menu = [
  ['/dashboard', 'Dashboard'],
  ['/fontes', 'Fontes'],
  ['/importacoes', 'Importações'],
  ['/projecoes-sep', 'Projeções SEP'],
  ['/validacao-sefaz', 'Validação SEFAZ'],
  ['/homologacao-subset', 'Homologação SUBSET'],
  ['/relatorios', 'Relatórios'],
  ['/admin', 'Admin']
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="bg-institucional-navy text-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-lg font-semibold">Radar Art. 42</h1>
            <nav className="flex flex-wrap gap-4 text-sm">
              {menu.map(([href, label]) => (
                <Link key={href} href={href} className="hover:text-teal-200">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
