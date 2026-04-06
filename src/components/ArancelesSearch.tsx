'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

type Servicio = { id: string; titulo: string; arancel: number };

export default function ArancelesSearch({ servicios }: { servicios: Servicio[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = servicios.filter((s) =>
    s.titulo.toLowerCase().includes(active.toLowerCase())
  );

  const handleSearch = () => setActive(query);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setQuery('');
    setActive('');
    inputRef.current?.focus();
  };

  return (
    <>
      {/* ── Search bar ── */}
      <div className="mb-8 flex gap-3">
        <div className="relative flex-1">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Also filter live as user types
              setActive(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar trámite o servicio..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white font-body text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005ab4]/20 focus:border-[#005ab4] transition-all shadow-sm"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label="Limpiar búsqueda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center gap-2 font-label text-[11px] uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl bg-[#005ab4] text-white hover:bg-[#004a96] active:scale-95 transition-all focus:outline-none shadow-sm flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Buscar
        </button>
      </div>

      {/* ── Results count ── */}
      {active && (
        <p className="font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">
          {filtered.length === 0
            ? 'Sin resultados'
            : `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'} para "${active}"`}
        </p>
      )}

      {/* ── Pricing list ── */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-14 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="font-body text-slate-400 text-sm">
                No se encontraron trámites para <strong className="text-slate-600">"{active}"</strong>
              </p>
              <button
                onClick={handleClear}
                className="mt-4 font-label text-[10px] uppercase tracking-widest text-[#005ab4] hover:underline focus:outline-none"
              >
                Ver todos los trámites
              </button>
            </div>
          ) : (
            filtered.map((servicio) => (
              <div
                key={servicio.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-[#f2f3fd] transition-colors group"
              >
                {/* Left: title */}
                <h3 className="font-headline text-lg font-semibold text-slate-900 leading-snug mb-4 sm:mb-0">
                  {servicio.titulo}
                </h3>

                {/* Right: price + button */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 flex-shrink-0">
                  <span className="font-label text-2xl font-bold text-[#005ab4] tabular-nums">
                    ${servicio.arancel?.toLocaleString('es-CL')}{' '}
                    <span className="text-xs font-normal text-slate-400">CLP</span>
                  </span>
                  <Link
                    href={`/solicitar?servicio=${servicio.id}`}
                    className="font-label text-[11px] uppercase tracking-widest font-bold px-6 py-2.5 rounded-xl bg-[#f2f3fd] text-[#005ab4] hover:bg-[#005ab4] hover:text-white transition-all active:scale-95 flex items-center gap-2"
                  >
                    Solicitar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
